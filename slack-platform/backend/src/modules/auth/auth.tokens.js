import jwt from "jsonwebtoken";
import { env } from "../../config/env.js";

export const signAccessToken = (user) => {
    return jwt.sign(
        {
            sub: String(user._id),
            email: user.email,
            role: user.role,
            type: "access",
        },
        env.JWT_ACCESS_SECRET,
        {
            expiresIn: env.JWT_ACCESS_EXPIRES_IN,
        },
    );
};

export const signRefreshToken = (user, jti) => {
    return jwt.sign(
        {
            sub: String(user._id),
            jti,
            type: "refresh",
        },
        env.JWT_REFRESH_SECRET,
        {
            expiresIn: env.JWT_REFRESH_EXPIRES_IN,
        },
    );
};

export const verifyAccessToken = (token) => {
    return jwt.verify(token, env.JWT_ACCESS_SECRET);
};

export const verifyRefreshToken = (token) => {
    return jwt.verify(token, env.JWT_REFRESH_SECRET);
};
