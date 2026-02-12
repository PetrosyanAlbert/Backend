const { User } = require("../models");
const BadRequestError = require("../utils/BadRequestError");
const ConflictError = require("../utils/ConflictError");
const NotFoundError = require("../utils/NotFoundError");

const createUser = async ({ fullName, email, role }) => {
    if (!fullName || !email) {
        throw new BadRequestError("fullName and email are required");
    }
    const exists = await User.findOne({ where: { email } });
    if (exists) throw new ConflictError("User with this email already exists");
    const user = await User.create({ fullName, email, role });
    return user;
};

const getAllUsers = async () => {
    const users = await User.findAll();
    return users;
};

const getUserById = async (id) => {
    const user = await User.findByPk(id);
    if (!user) {
        throw new NotFoundError("User not found");
    }
    return user;
};

module.exports = { createUser, getAllUsers, getUserById };
