import { httpStatus } from "../constants/index.js";

export class AppError extends Error {
    constructor(
        message,
        statusCode = httpStatus.INTERNAL_SERVER_ERROR,
        code = "INTERNAL SERVER ERROR",
    ) {
        super(message);

        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.code = code;
        this.isOperational = true;

        Error.captureStackTrace?.(this, this.constructor);
    }
}
