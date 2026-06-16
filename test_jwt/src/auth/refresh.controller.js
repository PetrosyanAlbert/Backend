import { verifyRefresh, signAccess } from "../tokens.js";
import { redis } from "../redis.js";

export async function refresh(req, res) {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(401);
    let payload;
    try {
        payload = verifyRefresh(token);
    } catch {
        return res.status(403);
    }
    const saved = await redis.get(`refresh:${payload.userId}`);
    if (!saved || saved !== token) {
        return res.status(403);
    }
    const accessToken = signAccess({ id: payload.userId });
    res.json({ accessToken });
}
