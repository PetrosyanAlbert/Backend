const fs = require('node:fs');
const path = require('path');
require('dotenv').config();

const dir = path.join(__dirname, '..', 'logs');
const file = path.join(dir, 'chat.log');
fs.writeFileSync(file, '', 'utf8');
function getTimestamp() {
    const now = new Date();
    const date = now.toISOString().slice(0, 10);
    const time = now.toTimeString().slice(0, 8);
    return `${date} ${time}`;
};

function log(message) {
    const line = `[${getTimestamp()}] ${message}\n`;
    try {
        fs.appendFileSync(file, line, 'utf8');
    } catch (err) {
        console.error("Logger error", err);
    }
}

module.exports = {log};

