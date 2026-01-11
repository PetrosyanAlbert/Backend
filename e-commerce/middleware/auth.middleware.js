const jwt = require("jsonwebtoken");
const HTTP = require("../utils/httpStatus");
const MY_TOKEN = process.env.JWT_SECRET;
module.exports = function authMiddleware(req, res, next) {
    try {
        const auth = req.headers.authorization;
        if (!auth) {
            return res
                .status(HTTP.UNAUTHORIZED)
                .json({ message: "Authorization header missing" });
        }
        const [type, token] = auth.split(" ");
        if (type !== "Bearer" || !token) {
            return res
                .status(HTTP.UNAUTHORIZED)
                .json({ message: "Invalid authorization format" });
        }
        const payload = jwt.verify(token, MY_TOKEN);
        req.user = {
            id: payload.id,
            role: payload.role,
        };
        next();
    } catch (err){
        return res.status(HTTP.UNAUTHORIZED).json({ message: "Invalid or expired token" });
    }
};
