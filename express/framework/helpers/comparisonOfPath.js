module.exports = function comparisionOfPath(routePath, reqPath) {
    const route = routePath.split("/").filter(Boolean);
    const req = reqPath.split("/").filter(Boolean);
    if (route.length !== req.length) return null;
    const params = {};
    for (let i = 0; i < route.length; ++i) {
        const routeItem = route[i];
        const reqItem = req[i];
        if (routeItem.startsWith(":")) {
            const key = routeItem.slice(1);
            params[key] = reqItem;
        } else if (routeItem !== reqItem) {
            return null;
        }
    }
    return params;
};