const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, `Please provide name`],
    minlength: 3,
    maxlength: 25,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    minlength: 3,
    maxlength: 35,
    unique: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please provide a valid email address",
    ],
  },
  password: {
    type: String,
    required: [true, `Please provide the password `],
    minlength: 3,
  },
});

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.getName = function () {
  return this.name;
};

UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id, name: this.name }, process.env.SECRET, {
    expiresIn: "30d",
  });
};

module.exports = mongoose.model("User", UserSchema);
