module.exports = function parseUrl(req) {
    const parts = req.url.split('/').filter((Boolean));
    return { resource: parts[0] , id: parts[1] || null};
}