import { httpStatus } from "../constants/index.js";
import { AppError } from "./AppError.js";

export class ForbiddenError extends AppError {
    constructor(message = "Forbidden") {
        super(message, httpStatus.FORBIDDEN, "FORBIDDEN");
    }
}
