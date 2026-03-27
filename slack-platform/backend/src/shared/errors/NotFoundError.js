import { httpStatus } from "../constants/index.js";
import { AppError } from "./AppError.js";

export class NotFoundError extends AppError {
    constructor(message = "Resource not found") {
        super(message, httpStatus.NOT_FOUND, "NOT_FOUND");
    }
}
