module.exports = function sendResponse(res, status, data) {
    res.writeHead(status, { "Content-Type": "application/json" });
    if (data === undefined) {
        res.end();
    } else {
        res.end(JSON.stringify(data));
    }
};
