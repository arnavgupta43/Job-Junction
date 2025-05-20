const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, unAuthenticatedError } = require("../errors");
const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res
    .status(StatusCodes.CREATED)
    .json({ user: { name: user.getName() }, token });
};
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new unAuthenticatedError("Invalid Credentials");
  }
  const matchPassword = await user.comparePassword(password);
  if (matchPassword == true) {
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
  } else {
    throw new unAuthenticatedError("Invalid Credentials");
  }
};

module.exports = {
  register,
  login,
};
