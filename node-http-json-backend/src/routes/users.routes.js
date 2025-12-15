const path = require('node:path');
const { readJSON, writeJSON } = require('../utils/jsonStorage');
const sendResponse = require('../utils/sendResponse');
const bodyParser = require('../utils/bodyParser');
const parseUrl = require('../utils/parseUrl');

const dataPath = path.join(__dirname, '../../data/users.json');
module.exports = async function usersRoutes(req, res) {
    const {resource, id} = parseUrl(req);
    if (resource !== 'users') return;

    if (req.method === 'GET' && !id) {
        const users = readJSON(dataPath);
        return sendResponse(res, 200, users);
    }

    if (req.method === 'GET' && id) {
        const users = readJSON(dataPath);
        const user = users.find(u => u.id === id);

        if (!user) {
            return sendResponse(res, 404, {message: 'User not found'});
        }
        return sendResponse(res, 200, user);
    }

    if (req.method === 'POST' && !id) {
        try {
            const body = await bodyParser(req);
            if (!body) {
                return sendResponse(res, 400, {message: 'Request body is required'});
            }
            const {name, email, role} = body;
            if (!name || !email) {
                return sendResponse(res, 400, {message: 'Name and Email are required'});
            }
            const users = readJSON(dataPath);
            if (users.some(u => u.email === email)) {
                return sendResponse(res, 400, {message: 'Email must be unique'});
            }
            const now = new Date().toISOString();
            const lastId = users.length
            ? Math.max(...users.map(u => Number(u.id)))
            :0;
            const newId = (lastId + 1).toString();
            const newUser = {
                id: newId,
                name,
                email,
                role: role || 'user',
                createdAt: now,
                updatedAt: now
            }
            users.push(newUser);
            writeJSON(dataPath, users);
            return sendResponse(res, 201, newUser);
        } catch (err) {
            return sendResponse(res, 400, {message: err.message || 'Invalid JSON'});
        }
    }

    if (req.method === 'PUT' && id) {
        try {
            const body = await bodyParser(req);
            if (!body) {
                return sendResponse(res, 400, {message: 'Request body id required'});
            }
            const {name, email, role} = body;
            if (!name || !email || !role) {
                return sendResponse(res, 400, {message: 'PUT requires name, email and role'});
            }
            const users = readJSON(dataPath);
            const index = users.findIndex(u => u.id === id);

            if (index === -1) {
                return sendResponse(res, 404, {message: 'User not found'});
            }
            const emailT = users.some(u => u.email === email && u.id !== id);
            if (emailT) {
                return sendResponse(res, 400, {message: 'Email must be unique'});
            }
            const putUser = users[index];
            const updateUser = {
                ...putUser,
                name,
                email,
                role: role,
                updatedAt: new Date().toISOString()
            };
            users[index] = updateUser;
            writeJSON(dataPath, users);
            return sendResponse(res, 200, updateUser);
        } catch (err) {
            return sendResponse(res, 400, {message: err.message || 'Invalid JSON'});
        }
    }

    if (req.method === 'PATCH' && id) {
        try {
            const body = await bodyParser(req);
            if (!body) {
                return sendResponse(res, 400, {message: 'Request body is required'});
            }
            const users = readJSON(dataPath);
            const user = users.find(u => u.id === id);
            if (!user) {
                return sendResponse(res, 404, {message: 'User not found'});
            }
            const {name, email, role} = body;
            if (email) {
                const emailT = users.some(u => u.email === email && u.id !== id);
                if (emailT) {
                    return sendResponse(res, 400, {message: 'Email must be unique'});
                }
            }
            if (name !== undefined) user.name = name;
            if (email !== undefined) user.email = email;
            if (role !== undefined) user.role = role;
            user.updatedAt = new Date().toISOString();
            writeJSON(dataPath, users);
            return sendResponse(res, 200, user);
        } catch (err) {
            return sendResponse(res, 400, {message: err.message || 'Invalid JSON'});
        }
    }
    
    if (req.method === 'DELETE' && id) {
        const users = readJSON(dataPath);
        const index = users.findIndex(u => u.id === id);
        if (index === -1) {
            return sendResponse(res, 400, {message: 'User not found'});
        }
        users.splice(index, 1);
        writeJSON(dataPath, users);
        return sendResponse(res, 204);
    }
    return sendResponse(res, 405, { message: 'Method Not Allowed' });
}