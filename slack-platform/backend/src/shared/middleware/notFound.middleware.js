import { NotFoundError } from "../errors/index.js";

export const notFoundMiddleware = (req, _, next) => {
    next(new NotFoundError(`Route ${req.originalUrl} not found`));
};
