require("dotenv").config({ quiet: true });
const express = require("express");
const path = require("node:path");
const multer = require("multer");
const validateRegister = require("./helpers/validateRegister");
const { readFile, writeFile } = require("./helpers/read_writeFile");

const app = express();
const PORT = process.env.PORT;

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));

const registerHTML = path.join(__dirname, "public", "register.html");
const loginHTML = path.join(__dirname, "public", "login.html");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads");
    },
    filename: (req, file, cb) => {
        const uniq = Date.now() + "-" + file.originalname;
        cb(null, uniq);
    },
});

const upload = multer({ storage });

app.get("/register", (_, res) => {
    res.sendFile(registerHTML);
});

app.get("/login", (_, res) => {
    res.sendFile(loginHTML);
});

app.post("/register", upload.single("image"), async (req, res) => {
    try {
        const users = await readFile();
        const errors = validateRegister(req.body, users);
        if (errors.length > 0) {
            return res.status(400).json({ ok: false, errors });
        }
        const { fullName, email, password } = req.body;
        const user = {
            fullName,
            email,
            password,
            image: req.file ? `/uploads/${req.file.filename}` : null,
            createdAt: new Date().toISOString(),
        };
        users.push(user);
        await writeFile(users);
        return res.json({
            ok: true,
            message: "User registred succesfully",
            user: {
                fullName: user.fullName,
                email: user.email,
                imageUrl: user.image,
            },
        });
    } catch (err) {
        return res.status(500).json({
            ok: false,
            message: err.message,
        });
    }
});

app.post("/login", async (req, res) => {
    try {
        console.log(req.body);
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                ok: false,
                message: "Email and password are required",
            });
        }
        const users = await readFile();
        const user = users.find(
            (u) => u.email === email && u.password === password
        );
        if (!user) {
            return res
                .status(401)
                .json({ ok: false, message: "Invalid email or password" });
        }
        return res.json({
            ok: true,
            message: "Login succesfully",
            user: {
                fullName: user.fullName,
                email: user.email,
                imageUrl: user.image,
                createdAt: user.createdAt,
            },
        });
    } catch (err) {
        return res.status(500).json({
            ok: false,
            message: err.message,
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
