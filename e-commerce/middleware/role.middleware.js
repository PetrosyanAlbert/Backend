const HTTP = require("../utils/httpStatus");

module.exports = function roleMiddleware(role) {
    return function (req, res, next) {
        if (!req.user) {
            return res.status(HTTP.UNAUTHORIZED).json({ message: "Unauthenticated" });
        }
        if (req.user.role !== role) {
            return res.status(HTTP.FORBIDDEN).json({ message: "Forbidden" });
        }
        next();
    };
};
