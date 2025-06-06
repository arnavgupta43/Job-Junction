const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("./custom-api");

class unAuthenticatedError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = unAuthenticatedError;
