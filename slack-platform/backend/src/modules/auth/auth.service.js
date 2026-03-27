import bcrypt from "bcryptjs";
import { User } from "../users/users.model.js";
import {
    ConflictError,
    NotFoundError,
    UnauthorizedError,
} from "../../shared/errors/index.js";
import { userStatuses, systemRoles } from "../../shared/constants/index.js";
import { randomId } from "../../shared/utils/randomId.js";
import {
    signAccessToken,
    signRefreshToken,
    verifyRefreshToken,
} from "./auth.tokens.js";
import { getRefreshKey } from "../../shared/utils/index.js";
import { redis } from "../../db/index.js";
import { env } from "../../config/env.js";
import { sanitizedUser } from "../../shared/utils/index.js";

const createSession = async (user) => {
    const jti = randomId();
    const accessToken = signAccessToken(user);
    const refreshToken = signRefreshToken(user, jti);
    const refreshKey = getRefreshKey(user._id, jti);
    await redis.set(refreshKey, "1", { EX: env.REFRESH_TOKEN_TTL_SECONDS });

    return {
        user: sanitizedUser(user),
        accessToken,
        refreshToken,
    };
};

export const registerUser = async ({ fullName, username, email, password }) => {
    const normalizedEmail = email.toLowerCase();
    const normalizedUsername = username.toLowerCase();

    const existingUserByEmail = await User.findOne({ email: normalizedEmail });

    if (existingUserByEmail) {
        throw new ConflictError("Email already exists");
    }

    const existingUserByUsername = await User.findOne({
        username: normalizedUsername,
    });

    if (existingUserByUsername) {
        throw new ConflictError("Username already exists");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
        fullName,
        username: normalizedUsername,
        email: normalizedEmail,
        passwordHash,
        role: systemRoles.USER,
        status: userStatuses.ACTIVE,
    });

    return createSession(user);
};

export const loginUser = async ({ email, password }) => {
    const normalizedEmail = email.toLowerCase();

    const user = await User.findOne({ email: normalizedEmail }).select(
        "+passwordHash",
    );

    if (!user) {
        throw new UnauthorizedError("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
        throw new UnauthorizedError("Invalid email or password");
    }

    if (user.status !== userStatuses.ACTIVE) {
        throw new UnauthorizedError("User is not active");
    }

    return createSession(user);
};

export const refreshUserSession = async (refreshToken) => {
    if (!refreshToken) {
        throw new UnauthorizedError("Refresh token is required");
    }

    let payload;
    
    try {
        payload = verifyRefreshToken(refreshToken);
    } catch {
        throw new UnauthorizedError("Invalid or expired refresh token");
    }

    if (payload.type !== "refresh") {
        throw new UnauthorizedError("Refresh token is required");
    }

    const oldKey = getRefreshKey(payload.sub, payload.jti);
    const sessionExists = redis.get(oldKey);

    if (!sessionExists) {
        throw new UnauthorizedError("Refresh session not found");
    }

    const user = await User.findById(payload.sub);

    if (!user) {
        throw new NotFoundError("User not found");
    }

    if (user.status !== userStatuses.ACTIVE) {
        throw new UnauthorizedError("User is not active");
    }

    await redis.del(oldKey);
    return createSession(user);
};

export const logoutUser = async (refershToken) => {
    if (!refershToken) return;

    try {
        const payload = verifyRefreshToken(refershToken);
        const refreshKey = getRefreshKey(payload.sub, payload.jti);
        await redis.del(refreshKey);
    } catch {
        return;
    }
};
