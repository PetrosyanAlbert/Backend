require("dotenv").config({quiet: true});
const express = require("express");
const fs = require("fs").promises;
const path = require("path");
const app = express();
const PORT = process.env.PORT;
const TASK_FILE = path.resolve(process.env.TASK_FILE);
app.use(express.json());

async function readTasks() {
    try {
        const data = await fs.readFile(TASK_FILE, "utf-8");
        return JSON.parse(data);
    } catch (err) {
        console.log(err.message);
        return;
    }
}

async function writeTasks(tasks) {
    await fs.writeFile(TASK_FILE, JSON.stringify(tasks, null, 2));
}

app.get("/tasks", async (req, res) => {
    try {
        const tasks = await readTasks();
        return res.status(200).json(tasks);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

app.get("/tasks/:id", async (req, res) => {
    try {
        const tasks = await readTasks();
        const exist = tasks.find((t) => t.id === req.params.id);
        if (!exist) {
            return res.status(404).json({ message: "Task not found" });
        }
        return res.status(200).json(exist);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

app.post("/tasks", async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title) {
            return res.status(400).json({ message: "Invalid JSON" });
        }
        const tasks = await readTasks();
        const newTask = {
            id: Date.now(),
            title,
            description,
            completed: false,
            createdAt: new Date().toISOString(),
        };
        tasks.push(newTask);
        await writeTasks(tasks);
        return res.status(200).json(newTask);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

app.patch("/tasks/:id", async (req, res) => {
    try {
        const { completed } = req.params.body;
        if (!completed) {
            return res.status(400).json({ message: "Invalid JSON" });
        }
        const tasks = await readTasks();
        const exist = tasks.findIndex((t) => t.id === req.params.id);
        if (exist === -1) {
            return res.status(404).json({ message: "Task not found" });
        }
        tasks[exist].completed = completed;
        await writeTasks(tasks);
        return res.status(200).json("Task updated");
    } catch (err) {
        return es.status(500).json({ message: err.message });
    }
});

app.delete("/tasks/:id", async (req, res) => {
    try {
        const tasks = await readTasks();
        const filtered = tasks.filter(t => t.id !== req.params.id);
        await writeTasks(filtered);
        res.status(200).json({ message: "Task deleted" });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
