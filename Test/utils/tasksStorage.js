const fs = require('node:fs');
const path = require('node:path');
const TASK_FILE = path.join(__dirname,"..", "db", "tasks.json");

function readTasks() {
    try {
        const data = fs.readFileSync(TASK_FILE);
        if (!data) return [];
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
}

function writeTasks(task) {
    fs.writeFileSync(TASK_FILE, JSON.stringify(task, null, 2));
}

module.exports = {readTasks, writeTasks};