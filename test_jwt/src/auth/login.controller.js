import { signAccess, signRefresh } from "../tokens.js";
import { redis } from "../redis.js";

export async function login(req, res) {
    const { username, email } = req.body;
    const user = {
        id: email,
        username,
        email,
    };
    const accessToken = signAccess(user);
    const refreshToken = signRefresh({ userId: user.id });

    await redis.set(`refresh:${user.id}`, refreshToken, {
        EX: 7 * 24 * 60 * 60,
    });
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
}
