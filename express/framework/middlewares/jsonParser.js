const HTTP = require("../helpers/statusCodes");

module.exports = function jsonParser() {
    return function (req, res, next) {
        const method = req.method;
        const contentType = req.headers["content-type"] || "";
        if (
            !["POST", "PUT"].includes(method) ||
            !contentType.includes("application/json")
        ) {
            return next();
        }
        let body = "";

        req.on("data", (chunk) => {
            body += chunk;
        });

        req.on("end", () => {
            if (!body) {
                req.body = {};
                return next();
            }
            try {
                req.body = JSON.parse(body);
                next();
            } catch (err) {
                res.statusCode = HTTP.BAD_REQUEST;
                res.setHeader("Content-Type", "application/json");
                return res.end({ message: "Invalid JSON" });
            }
        });
    };
};
