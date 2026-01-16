const fs = require("node:fs/promises");
const path = require("node:path");

const USERS_FILE = path.join(__dirname,"..", "data", "users.json");

const readFile = async () => {
    try {
        const data = await fs.readFile(USERS_FILE);
        return data ? JSON.parse(data) : [];
    } catch (err) {
        return [];
    }
};

const writeFile = async (data) => {
    try {
        await fs.writeFile(USERS_FILE, JSON.stringify(data, null, 2));
    } catch (err) {
        console.error("Error writing file:", err);
        throw err;
    }
};

module.exports = { readFile, writeFile };
