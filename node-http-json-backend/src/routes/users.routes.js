const path = require("node:path");
const { readJSON, writeJSON } = require("../utils/jsonStorage");
const sendResponse = require("../utils/sendResponse");
const bodyParser = require("../utils/bodyParser");
const parseUrl = require("../utils/parseUrl");
const STATUS = require("../utils/httpStatus");

const dataPath = path.join(__dirname, "../../data/users.json");
module.exports = async function usersRoutes(req, res) {
    const { resource, id } = parseUrl(req);
    if (resource !== "users") return;

    if (req.method === "GET" && !id) {
        const users = readJSON(dataPath);
        return sendResponse(res, STATUS.OK, users);
    }

    if (req.method === "GET" && id) {
        const users = readJSON(dataPath);
        const user = users.find((u) => u.id === id);

        if (!user) {
            return sendResponse(res, STATUS.NOT_FOUND, {
                message: "User not found",
            });
        }
        return sendResponse(res, STATUS.OK, user);
    }

    if (req.method === "POST" && !id) {
        try {
            const body = await bodyParser(req);
            if (!body) {
                return sendResponse(res, STATUS.BAD_REQUEST, {
                    message: "Request body is required",
                });
            }
            const { name, email, role } = body;
            if (!name || !email) {
                return sendResponse(res, STATUS.BAD_REQUEST, {
                    message: "Name and Email are required",
                });
            }
            const users = readJSON(dataPath);
            if (users.some((u) => u.email === email)) {
                return sendResponse(res, STATUS.BAD_REQUEST, {
                    message: "Email must be unique",
                });
            }
            const now = new Date().toISOString();
            const lastId = users.length
                ? Math.max(...users.map((u) => Number(u.id)))
                : 0;
            const newId = (lastId + 1).toString();
            const newUser = {
                id: newId,
                name,
                email,
                role: role || "user",
                createdAt: now,
                updatedAt: now,
            };
            users.push(newUser);
            writeJSON(dataPath, users);
            return sendResponse(res, STATUS.CREATED, newUser);
        } catch (err) {
            return sendResponse(res, STATUS.BAD_REQUEST, {
                message: err.message || "Invalid JSON",
            });
        }
    }

    if (req.method === "PUT" && id) {
        try {
            const body = await bodyParser(req);
            if (!body) {
                return sendResponse(res, STATUS.BAD_REQUEST, {
                    message: "Request body id required",
                });
            }
            const { name, email, role } = body;
            if (!name || !email || !role) {
                return sendResponse(res, STATUS.BAD_REQUEST, {
                    message: "PUT requires name, email and role",
                });
            }
            const users = readJSON(dataPath);
            const index = users.findIndex((u) => u.id === id);

            if (index === -1) {
                return sendResponse(res, STATUS.NOT_FOUND, {
                    message: "User not found",
                });
            }
            const emailT = users.some((u) => u.email === email && u.id !== id);
            if (emailT) {
                return sendResponse(res, STATUS.BAD_REQUEST, {
                    message: "Email must be unique",
                });
            }
            const putUser = users[index];
            const updateUser = {
                ...putUser,
                name,
                email,
                role: role,
                updatedAt: new Date().toISOString(),
            };
            users[index] = updateUser;
            writeJSON(dataPath, users);
            return sendResponse(res, STATUS.OK, updateUser);
        } catch (err) {
            return sendResponse(res, STATUS.BAD_REQUEST, {
                message: err.message || "Invalid JSON",
            });
        }
    }

    if (req.method === "PATCH" && id) {
        try {
            const body = await bodyParser(req);
            if (!body) {
                return sendResponse(res, STATUS.BAD_REQUEST, {
                    message: "Request body is required",
                });
            }
            const users = readJSON(dataPath);
            const user = users.find((u) => u.id === id);
            if (!user) {
                return sendResponse(res, STATUS.NOT_FOUND, {
                    message: "User not found",
                });
            }
            const { name, email, role } = body;
            if (email) {
                const emailT = users.some(
                    (u) => u.email === email && u.id !== id
                );
                if (emailT) {
                    return sendResponse(res, STATUS.BAD_REQUEST, {
                        message: "Email must be unique",
                    });
                }
            }
            if (name !== undefined) user.name = name;
            if (email !== undefined) user.email = email;
            if (role !== undefined) user.role = role;
            user.updatedAt = new Date().toISOString();
            writeJSON(dataPath, users);
            return sendResponse(res, STATUS.OK, user);
        } catch (err) {
            return sendResponse(res, STATUS.BAD_REQUEST, {
                message: err.message || "Invalid JSON",
            });
        }
    }

    if (req.method === "DELETE" && id) {
        const users = readJSON(dataPath);
        const index = users.findIndex((u) => u.id === id);
        if (index === -1) {
            return sendResponse(res, STATUS.NOT_FOUND, {
                message: "User not found",
            });
        }
        users.splice(index, 1);
        writeJSON(dataPath, users);
        return sendResponse(res, STATUS.NO_CONTENT);
    }
    return sendResponse(res, STATUS.METHOD_NOT_ALLOWED, {
        message: "Method Not Allowed",
    });
};
