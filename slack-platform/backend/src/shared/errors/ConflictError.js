import { httpStatus } from "../constants/index.js";
import { AppError } from "./AppError.js";

export class ConflictError extends AppError {
    constructor(message = "Conflict") {
        super(message, httpStatus.CONFLICT, "CONFLICT");
    }
}
