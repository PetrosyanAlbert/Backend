import { REFRESH_COOKIE_NAME } from "../../shared/constants/index.js";
import {
    created,
    getRefreshCookieOptions,
    getRefreshCookieSetOptions,
    ok,
} from "../../shared/utils/index.js";
import {
    loginUser,
    logoutUser,
    refreshUserSession,
    registerUser,
} from "./auth.service.js";

export const register = async (req, res) => {
    const result = await registerUser(req.body);

    res.cookie(
        REFRESH_COOKIE_NAME,
        result.refreshToken,
        getRefreshCookieSetOptions(),
    );

    return created(res, "User registered successfully", {
        user: result.user,
        accessToken: result.accessToken,
    });
};

export const login = async (req, res) => {
    const result = await loginUser(req.body);

    res.cookie(
        REFRESH_COOKIE_NAME,
        result.refreshToken,
        getRefreshCookieSetOptions(),
    );

    return ok(res, "Login successful", {
        user: result.user,
        accessToken: result.accessToken,
    });
};

export const refresh = async (req, res) => {
    const refreshToken = req.cookies?.[REFRESH_COOKIE_NAME];
    const result = await refreshUserSession(refreshToken);

    res.cookie(
        REFRESH_COOKIE_NAME,
        result.refreshToken,
        getRefreshCookieSetOptions(),
    );

    return ok(res, "Token refreshed successfully", {
        user: result.user,
        accessToken: result.accessToken,
    });
};

export const logout = async (req, res) => {
    const refreshToken = req.cookies?.[REFRESH_COOKIE_NAME];

    await logoutUser(refreshToken);

    res.clearCookie(REFRESH_COOKIE_NAME, getRefreshCookieOptions());

    return ok(res, "Logout successful");
};
