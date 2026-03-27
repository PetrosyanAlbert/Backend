import { verifyAccessToken } from "../../modules/auth/auth.tokens.js";
import { UnauthorizedError } from "../errors/index.js";

export const authMiddleware = (req, _, next) => {
    const header = req.headers.authorization;

    if (!header) {
        return next(new UnauthorizedError("Authorization header is required"));
    }

    const [scheme, token] = header.split(" ");

    if (scheme !== "Bearer" || !token) {
        return next(new UnauthorizedError("Invalid authorization format"));
    }

    try {
        const payload = verifyAccessToken(token);

        if (payload.type !== "access") {
            return next(new UnauthorizedError("Invalid access token type"));
        }

        req.user = payload;
        next();
    } catch {
        next(new UnauthorizedError("Invalid or expired access token"));
    }
};
