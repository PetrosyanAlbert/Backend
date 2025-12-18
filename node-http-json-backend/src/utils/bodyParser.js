module.exports = function bodyParser(req) {
    return new Promise((resolve, reject) => {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk.toString();
        });
        req.on("end", () => {
            if (!body) {
                return resolve(null);
            }
            try {
                const parsed = JSON.parse(body);
                resolve(parsed);
            } catch (err) {
                reject(new Error("Invalid JSON"));
            }
        });
        req.on("error", (err) => {
            reject(err);
        });
    });
};
