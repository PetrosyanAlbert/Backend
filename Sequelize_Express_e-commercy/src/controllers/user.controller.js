const userService = require("../services/user.service");

const create = async (req, res, next) => {
    try {
        const { fullName, email, role } = req.body;
        const user = await userService.createUser({ fullName, email, role });
        return res.status(201).json({ data: user.toJSON() });
    } catch (err) {
        next(err);
    }
};

const getAll = async (_, res, next) => {
    try {
        const users = await userService.getAllUsers();
        return res.status(200).json({ data: users.map((u) => u.toJSON()) });
    } catch (err) {
        next(err);
    }
};

const getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await userService.getUserById(id);
        return res.status(200).json({ data: user.toJSON() });
    } catch (err) {
        next(err);
    }
};

module.exports = { create, getAll, getById };
