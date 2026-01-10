const access = require("node:fs");
const fs = require("node:fs/promises");
const path = require("node:path");

function existsFile(filePath) {
    return access.existsSync(filePath);
}

async function readFile(filePath) {
    if (!existsFile(filePath)) return [];
    const raw = await fs.readFile(filePath, "utf8");
    if (!raw.trim()) return [];
    try {
        return JSON.parse(raw);
    } catch {
        throw new Error(`Invalid JSON in file: ${filePath}`);
    }
}

async function writeFileAtomic(filePath, data) {
    const dir = path.dirname(filePath);
    const tmpFile = filePath + ".tmp";
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(tmpFile, JSON.stringify(data, null, MAGIC_NUMBERS.TWO));
    await fs.rename(tmpFile, filePath);
}

module.exports = { readFile, writeFileAtomic };
