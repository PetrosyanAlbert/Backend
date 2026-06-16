import { Router } from "express";
import { login } from "./auth/login.controller.js";
import { refresh } from "./auth/refresh.controller.js";
import { logout } from "./auth/logout.controller.js";
import { auth } from "./auth/auth.middleware.js";

const router = Router();

router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", logout);

router.get("/me", auth, (req, res) => {
    res.json(req.user);
});

export default router;
