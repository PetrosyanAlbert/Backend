import { verifyAccess } from "../tokens.js";

export function auth(req, res, next) {
    const header = req.headers.authorization;
    if (!header) return res.sendStatus(401);

    const token = header.split(" ")[1];

    try {
        req.user = verifyAccess(token);
        next();
    } catch(err) {
        res.sendStatus(401);
    }
}