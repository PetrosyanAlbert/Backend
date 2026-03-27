import { httpStatus } from "../constants/index.js";
import { AppError } from "./AppError.js";

export class UnauthorizedError extends AppError {
    constructor(message = "Unaothorized") {
        super(message, httpStatus.UNAUTHORIZED, "UNAUTHORIZED");
    }
}
