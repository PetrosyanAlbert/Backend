const express = require("express");
const path = require("node:path");
const { readFile } = require("../utils/jsonStore");
const auth = require("../middleware/auth.middleware");
const authRole = require("../middleware/role.middleware");
const HTTP = require("../utils/httpStatus");

const router = express.Router();
const USERS_PATH = path.join(__dirname, "../data/users.json");

router.get("/", auth, authRole("admin"), async (_, res) => {
    try {
        const users = await readFile(USERS_PATH);
        const safeUsers = users.map(({ passwordHash, ...rest }) => rest);
        res.json(safeUsers);
    } catch (err) {
        res.status(HTTP.INTERNAL_SERVER_ERROR).json({ message: err.message });
    }
});

module.exports = router;