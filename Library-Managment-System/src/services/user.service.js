const bcrypt = require("bcrypt");
const { read, write } = require("./jsonStore");
const generateId = require("../utils/id");
const USER_FIlE = "users.json";

async function findByEmail(email) {
    const users = await read(USER_FIlE);
    return users.find((u) => u.email === email) || null;
}

async function findById(id) {
    const users = await read(USER_FIlE);
    return users.find((u) => u.id === id) || null;
}

async function createUser({ name, email, password }) {
    const users = await read(USER_FIlE);
    const exists = users.some((u) => u.email === email);
    if (exists) {
        throw new Error("Email already exists");
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = {
        id: generateId("u"),
        name,
        email,
        passwordHash,
        role: "member",
        createdAt: new Date().toISOString(),
    };
    users.push(user);
    await write(USER_FIlE, users);
    return user;
}

async function verifyCredentials(email, password) {
    const user = await findByEmail(email);
    if (!user) return null;
    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) return null;
    return user;
}

async function getAllUsers() {
    return await read(USER_FIlE);
}

module.exports = {
    findByEmail,
    findById,
    createUser,
    verifyCredentials,
    getAllUsers,
};
