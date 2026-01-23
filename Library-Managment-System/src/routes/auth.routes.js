const express = require("express");
const router = express.Router();

const userService = require("../services/user.service");
const validateLogin = require("../utils/validateLogin");

router.get("/register", (_, res) => {
    res.render("pages/register", { error: null });
});

router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        await userService.createUser({ name, email, password });
        res.redirect("/login");
    } catch (err) {
        res.render("pages/register", { error: err.message });
    }
});

router.get("/login", (_, res) => {
    res.render("pages/login", { error: null });
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        validateLogin(email, password);
        const user = await userService.verifyCredentials(email, password);
        if (!user) throw new Error("Invalid email or password");
        req.session.userId = user.id;
        res.redirect("/books");
    } catch (err) {
        res.render("pages/login", { error: err.message });
    }
});

module.exports = router;
