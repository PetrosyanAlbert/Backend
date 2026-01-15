require("dotenv").config({ quiet: true });
const createApp = require("../framework/createApp");
const PORT = process.env.PORT;
const jsonParse = require("../framework/middlewares/jsonParser");
const urlencodedParser = require("../framework/middlewares/urlencodedParser");

const app = createApp();

app.use(jsonParse());
app.use(urlencodedParser());

const users = [];

app.get("/users/:id", (req, res) => {
    const user = users.find((u) => u.id === req.params.id);
    if (!user) {
        res.statusCode = 404;
        return res.end(JSON.stringify({ error: "User not found" }));
    }
    res.end(JSON.stringify(user));
});

app.post("/users", (req, res) => {
    const id = String(Date.now());
    const user = { id, ...req.body };
    users.push(user);
    res.end(JSON.stringify(user));
});

app.put("/users/:id", (req, res) => {
    const user = users.find((u) => u.id === req.params.id);
    if (!user) {
        res.statusCode = 404;
        return res.end(JSON.stringify({ error: "User not found" }));
    }
    Object.assign(user, req.body);
    return res.end(JSON.stringify(user));
});

app.delete("/users/:id", (req, res) => {
    const idx = users.findIndex((u) => u.id === req.params.id);
    if (idx === -1) {
        res.statusCode = 404;
        return res.end(JSON.stringify({ error: "User not found" }));
    }
    users.splice(idx, 1);
    res.statusCode = 204;
    res.end();
});

app.get("/boom", (req, res, next) => {
    throw new Error("Boom");
});

app.use((err, req, res, next) => {
    console.log("ERR->", err.message);
    if (!req.writableEnded) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({message: err.message}));
    }
    return;
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
