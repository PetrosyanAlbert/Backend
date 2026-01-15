const http = require("http");
const comparisonOfPath = require("./helpers/comparisonOfPath");
const HTTP = require("./helpers/statusCodes");

function createApp() {
    const middlewares = [];
    const routes = {
        GET: [],
        POST: [],
        PUT: [],
        DELETE: [],
    };

    const server = http.createServer((req, res) => {
        const url = new URL(req.url, `http://${req.headers.host}`);
        req.path = url.pathname;
        req.query = Object.fromEntries(url.searchParams.entries());
        req.params = {};
        let index = 0;

        function next(err) {
            const fn = middlewares[index++];
            if (!fn) {
                if (err) {
                    if (!res.writableEnded) {
                        res.statusCode = HTTP.INTERNAL_SERVER_ERROR;
                        return res.end("Internal Server Error");
                    }
                    return;
                }

                if (req.method === "GET") {
                    for (const route of routes.GET) {
                        const params = comparisonOfPath(route.path, req.path);
                        if (params) {
                            req.params = params;
                            try {
                                return route.handler(req, res, next);
                            } catch (err) {
                                next(err);
                            }
                        }
                    }
                }

                if (req.method === "POST") {
                    for (const route of routes.POST) {
                        const params = comparisonOfPath(route.path, req.path);
                        if (params) {
                            req.params = params;
                            try {
                                return route.handler(req, res, next);
                            } catch (err) {
                                next(err);
                            }
                        }
                    }
                }

                if (req.method === "PUT") {
                    for (const route of routes.PUT) {
                        const params = comparisonOfPath(route.path, req.path);
                        if (params) {
                            req.params = params;
                            try {
                                return route.handler(req, res, next);
                            } catch (err) {
                                next(err);
                            }
                        }
                    }
                }

                if (req.method === "DELETE") {
                    for (const route of routes.DELETE) {
                        const params = comparisonOfPath(route.path, req.path);
                        if (params) {
                            req.params = params;
                            try {
                                return route.handler(req, res, next);
                            } catch (err) {
                                next(err);
                            }
                        }
                    }
                }

                if (!res.writableEnded) {
                    res.statusCode = HTTP.NOT_FOUND;
                    return res.end("Not Found");
                }
                return;
            }

            const isErrMiddleware = fn.length === 4;

            try {
                if (err) {
                    if (isErrMiddleware) {
                        fn(err, req, res, next);
                    } else {
                        next(err);
                    }
                } else {
                    if (!isErrMiddleware) {
                        fn(req, res, next);
                    } else {
                        next();
                    }
                }
            } catch (err) {
                next(err);
            }
        }
        next();
    });

    return {
        use(fn) {
            middlewares.push(fn);
        },

        listen(port, cb) {
            server.listen(port, cb);
        },

        get(path, handler) {
            routes.GET.push({ path, handler });
        },

        post(path, handler) {
            routes.POST.push({ path, handler });
        },

        put(path, handler) {
            routes.PUT.push({ path, handler });
        },

        delete(path, handler) {
            routes.DELETE.push({ path, handler });
        },
    };
}

module.exports = createApp;
