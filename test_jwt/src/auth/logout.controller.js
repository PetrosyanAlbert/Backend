import jwt from "jsonwebtoken";
import { redis } from "../redis.js";

export async function logout(req, res) {
    const token = req.cookies.refreshToken;

    if (token) {
        const payload = jwt.decode(token);
        await redis.del(`refresh:${payload.userId}`);
    }
    res.clearCookie("refreshToken");
    res.status(204);
}