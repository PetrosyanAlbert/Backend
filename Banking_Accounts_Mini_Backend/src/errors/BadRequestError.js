const AppError = require("./AppError");

class BadRequest extends AppError {
    constructor(message = "Bad request") {
        super(message, 400);
    }
}

module.exports = BadRequest;
