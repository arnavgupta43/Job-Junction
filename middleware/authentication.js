const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { unAuthenticatedError } = require("../errors");

const auth = (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new unAuthenticatedError("Authentication invalid");
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.SECRET);
    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (error) {
    throw new unAuthenticatedError("Authentication invalid");
  }
};
module.exports = auth;
