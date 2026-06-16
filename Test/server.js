require("dotenv").config({ quiet: true });
const express = require("express");
const { readTasks, writeTasks } = require("./utils/tasksStorage");
const app = express();
const PORT = process.env.PORT;
const API_KEY = process.env.API_KEY;

app.use(express.json());

function checkApiKey(req, res, next) {
    const key = req.headers["x-api-key"];
    if (!key) {
        return res.status(401).json({ message: "API key is required" });
    }
    if (key !== API_KEY) {
        return res.status(403).json({ message: "Invalid API key" });
    }
    next();
}

app.get("/tasks", (req, res) => {
    const data = readTasks();
    return res.status(200).json(data);
});

app.get("/tasks/:id", (req, res) => {
    const id = +req.params.id;
    const data = readTasks();
    const task = data.find((t) => t.id === id);
    if (!task) {
        return res.status(404).json({ message: "Task Not Found" });
    }
    return res.status(200).json(task);
});

app.post("/tasks", checkApiKey, (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) {
        return res
            .status(400)
            .json({ message: "Title and description are required" });
    }
    const tasks = readTasks();
    const newTask = {
        id: Date.now(),
        title,
        description,
        completed: false,
        createdAt: new Date().toISOString(),
    };
    tasks.push(newTask);
    writeTasks(tasks);
    return res.status(201).json(newTask);
});

app.patch("/tasks/:id", checkApiKey, (req, res) => {
    const id = +req.params.id;
    const { completed } = req.body;
    if (typeof completed !== "boolean") {
        return res.status(400).json({
            message: "Completed must be boolean",
        });
    }
    const tasks = readTasks();
    const task = tasks.find((t) => t.id === id);
    if (!task) {
        return res.status(404).json({
            message: "Task not found",
        });
    }
    task.completed = completed;
    writeTasks(tasks);
    return res.status(200).json(task);
});

app.delete("/tasks/:id", checkApiKey, (req, res) => {
    const id = +req.params.id;
    const tasks = readTasks();
    const filtered = tasks.filter((t) => t.id !== id);
    if (filtered.length === tasks.length) {
        return res.status(404).json({ message: "Task Not Found" });
    }
    writeTasks(filtered);
    return res.status(200).json({ message: "Task deleted" });
});

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});
