const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("./custom-api");

class BadRequestError extends CustomAPIError {
  BadRequestError(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = BadRequestError;
