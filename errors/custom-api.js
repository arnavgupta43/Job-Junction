class CustomAPIError extends Error {
  CustomAPIError(message) {
    super(message);
  }
}
module.exports = CustomAPIError;
