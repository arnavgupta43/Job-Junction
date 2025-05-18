const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("./custom-api");

class unAuthenticatedError extends CustomAPIError {
  unAuthenticatedError(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = unAuthenticatedError;
