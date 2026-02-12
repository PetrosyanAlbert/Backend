const AppError = require("./AppError");

class BadRequestError extends AppError {
  constructor(message = "Bad Request") {
    super(400, message);
  }
}

module.exports = BadRequestError;
