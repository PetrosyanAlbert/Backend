const express = require("express");
const path = require("node:path");
const bcrypt = require("bcryptjs");
const { randomUUID } = require("node:crypto");
const jwt = require("jsonwebtoken");
const { readFile, writeFileAtomic } = require("../utils/jsonStore");
const JWT = process.env.JWT_SECRET;
const JWT_TIME = process.env.JWT_EXPIRES_IN;
const validateUser = require("../utils/validateUser");
const HTTP = require("../utils/httpStatus");
const router = express.Router();
const USERS_PATH = path.join(__dirname, "../data/users.json");

router.post("/register", async (req, res) => {
    try {
        validateUser(req.body);
        const { email, password } = req.body;
        const users = await readFile(USERS_PATH);
        const exists = users.find((u) => u.email === email);
        if (exists) {
            return res.status(HTTP.BAD_REQUEST).json({ message: "Email already exists" });
        }
        const passwordHash = await bcrypt.hash(password, 10);
        const user = {
            id: randomUUID(),
            email,
            passwordHash,
            role: "customer",
            createdAt: new Date().toISOString(),
        };
        users.push(user);
        await writeFileAtomic(USERS_PATH, users);
        return res.status(HTTP.CREATED).json({ id: user.id });
    } catch (err) {
        return res.status(HTTP.BAD_REQUEST).json({ message: err.message });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res
                .status(HTTP.BAD_REQUEST)
                .json({ message: "Email and password required" });
        }
        const users = await readFile(USERS_PATH);
        const user = users.find((u) => u.email === email);
        if (!user) {
            return res.status(HTTP.UNAUTHORIZED).json({ message: "Invalid data" });
        }
        const ok = await bcrypt.compare(password, user.passwordHash);
        if (!ok) {
            return res.status(HTTP.UNAUTHORIZED).json({ message: "Invalid data" });
        }
        const token = jwt.sign({ id: user.id, role: user.role }, JWT, {
            expiresIn: JWT_TIME,
        });
        return res.json(token);
    } catch (err) {
        return res.status(HTTP.INTERNAL_SERVER_ERROR).json({ message: err.message });
    }
});

module.exports = router;
