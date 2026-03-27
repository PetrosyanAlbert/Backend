import { httpStatus } from "../constants/httpStatus.js";
import { logger } from "../logger/logger.js";
import { fail } from "../utils/index.js";

export const errorHandlerMiddleware = (err, req, res, _) => {
    if (err.isOperational) {
        logger.warn({
            message: err.message,
            code: err.code,
            statusCode: err.statusCode,
            method: req.method,
            url: req.originalUrl,
        });

        return fail(res, err.statusCode, err.message, err.code);
    }

    logger.error({
        message: err.message || "Unexpected error",
        method: req.method,
        url: req.originalUrl,
        stack: err.stack,
    });

    return fail(
        res,
        httpStatus.INTERNAL_SERVER_ERROR,
        "Internal server error",
        "INTERNAL_SERVER_ERROR",
    );
};