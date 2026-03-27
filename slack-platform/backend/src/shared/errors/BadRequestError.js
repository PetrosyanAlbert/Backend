import { httpStatus } from "../constants/index.js";
import { AppError } from "./AppError.js";

export class BadRequestError extends AppError {
    constructor(message = "Bad request") {
        super(message, httpStatus.BAD_REQUEST, "BAD_REQUEST");
    }
}
