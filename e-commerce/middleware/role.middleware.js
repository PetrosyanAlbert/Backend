module.exports = function roleMiddleware(role) {
    return function (req, res, next) {
        if (!req.user) {
            return res.statis(401).json({ message: "Unauthenticated" });
        }
        if (req.user.role !== role) {
            return res.status(403).json({ message: "Forbidden" });
        }
        next();
    };
};
