export const getRefreshCookieOptions = () => {
    return {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/api/auth",
    };
};

export const getRefreshCookieSetOptions = () => {
    return {
        ...getRefreshCookieOptions(),
        maxAge: 1000 * 60 * 60 * 24 * 7,
    };
};