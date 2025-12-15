const path = require('node:path');
const { readJSON, writeJSON} = require('../utils/jsonStorage');
const sendResponse = require('../utils/sendResponse');
const bodyParser = require('../utils/bodyParser');
const parseUrl = require('../utils/parseUrl');

const dataPath = path.join(__dirname, '../../data/orders.json');
const STATUSES = ['pending', 'completed', 'cancelled'];

module.exports = async function orderRoutes(req, res) {
    const {resource, id} = parseUrl(req);

    if (resource !== 'orders') return;

    if (req.method === 'GET' && !id) {
        const orders = readJSON(dataPath);
        return sendResponse(res, 200, orders);
    }

    if(req.method === 'GET' && id) {
        const orders = readJSON(dataPath);
        const order = orders.find(o => o.id === id);
        if (!order) {
            return sendResponse(res, 404, {message: 'Order not found'});
        }
        return sendResponse(res, 200, order);
    }

    if (req.method === 'POST' && !id) {
        try {
            const body = await bodyParser(req);
            if (!body) {
                return sendResponse(res, 400, {message: 'Request body is required'});
            }
            const { title, amount, status} = body;
            if (!title || typeof amount !== 'number') {
                return sendResponse(res, 400, {message: 'Title and numeric amount are required'});
            }
            if (amount <= 0) {
                return sendResponse(res, 400, {message: 'Amount must be greater than 0'});
            }
            if (status && !STATUSES.includes(status)) {
                return sendResponse(res, 400, {message: 'Invalid order status'});
            }
            const orders = readJSON(dataPath);
            const lastId = orders.length
            ? Math.max(...orders.map(o => Number(o.id)))
            : 0;

            const now = new Date().toISOString();
            const newOrder = {
                id: (lastId + 1).toString(),
                title,
                amount,
                status: status || 'pending',
                createdAt: now,
                updatedAt: now
            }
            orders.push(newOrder);
            writeJSON(dataPath, orders);
            return sendResponse(res, 201, newOrder);
        } catch (err) {
            return sendResponse(res, 400, {message: err.message || 'Invalid JSON'});
        }
    }

    if (req.method === 'PUT' && id) {
        try {
            const body = await bodyParser(req);
            if (!body) {
                return sendResponse(res, 400, {message: 'Request body is required'});
            }
            const { title, amount, status } = body;
            if (!title || typeof amount !== 'number' || !status) {
                return sendResponse(res, 400, {message: 'PUT requires title, amount and status'});
            }  
            if (amount <= 0) {
                return sendResponse(res, 400, {message: 'Amount must be greater than 0'});
            }
            if (!STATUSES.includes(status)) {
                return sendResponse(res, 400, {message: 'Invalid order status'});
            }
            const orders = readJSON(dataPath);
            const index = orders.findIndex(o => o.id === id);
            if (index === -1) {
                return sendResponse(res, 404, {message: 'Order not found'});
            }
            const updatedOrder = {
                ...orders[index],
                title,
                amount,
                status,
                updatedAt: new Date().toISOString()
            };
            orders[index] = updatedOrder;
            writeJSON(dataPath, orders);
            return sendResponse(res, 200, updatedOrder);
        } catch (err) {
            return sendResponse(res, 400, { message: err.message || 'Invalid JSON'});
        }
    } 
    
    if (req.method === 'PATCH' && id) {
        try {
            const body = await bodyParser(req);
            if (!body) {
                return sendResponse(res, 400, { message: 'Request body is required' });
            }
            const orders = readJSON(dataPath);
            const order = orders.find(o => o.id === id);
            if (!order) {
                return sendResponse(res, 404, {message: 'Order not found'});
            }
            const { title, amount, status } = body;
            if (amount !== undefined) {
                if (typeof amount !== 'number' || amount <= 0) {
                    return sendResponse(res, 400, {
                        message: 'amount must be a number greater than 0'
                    });
                }
                order.amount = amount;
            }
            if (status !== undefined) {
                if (!STATUSES.includes(status)) {
                    return sendResponse(res, 400, {
                        message: 'Invalid order status'
                    });
                }
                order.status = status;
            }
            if (title !== undefined) {
                order.title = title;
            }
            order.updatedAt = new Date().toISOString();
            writeJSON(dataPath, orders);
            return sendResponse(res, 200, order);
        } catch (err) {
            return sendResponse(res, 400, {message: err.message || 'Invalid JSON'});
        }
    }

    if (req.method === 'DELETE' && id) {
        const orders = readJSON(dataPath);
        const index = orders.findIndex(o => o.id === id);

        if (index === -1) {
            return sendResponse(res, 404, { message: 'Order not found' });
        }

        orders.splice(index, 1);
        writeJSON(dataPath, orders);

        return sendResponse(res, 204);
    }

    return sendResponse(res, 405, { message: 'Method Not Allowed' });
}
