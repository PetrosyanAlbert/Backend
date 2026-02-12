const AppError = require("./AppError");

class NotFoundError extends AppError {
  constructor(message = "Not Found") {
    super(404, message);
  }
}

module.exports = NotFoundError;
