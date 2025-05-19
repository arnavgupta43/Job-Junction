const { CustomAPIError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const errorHandlerMiddleware = (err, req, res, next) => {
  let CustomError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went",
  };
  if (err.name === "ValidationError") {
    CustomError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
    CustomError.statusCode = 400;
  }
  if (err.code && err.code === 11000) {
    CustomError.msg = `Duplicate value for ${Object.keys(
      err.keyValue
    )} field, please choose another value`;
    CustomError.statusCode = 400;
  }
  if (err.anme === "CastError") {
    CustomError.msg = `No item with id: ${err.value}`;
    CustomError.statusCode = 400;
  }
  return res.status(CustomError.statusCode).json({ msg: CustomError.msg });
};
module.exports = errorHandlerMiddleware;
