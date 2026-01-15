module.exports = function () {
    return function (req, _, next) {
        const method = req.method;
        const contentType = req.headers["content-type"] || "";
         if (
            !["POST", "PUT", "PATCH"].includes(method) ||
            !contentType.includes("application/x-www-form-urlencoded")
        ) {
            return next();
        }
        let body = "";
        
        req.on("data", chunk => {
            body += chunk;
        });

        req.on("end", () => {
            if (!body) {
                req.body = {};
                return next();
            }
            const params = new URLSearchParams(body);
            const result = {};
            for (const [key, value] of params.entries()) {
                result[key] = value;
            }
            req.body = result;
            next();
        });
    }
}