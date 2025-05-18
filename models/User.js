const mongoose = require("mongoose");

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

module.exports = mongoose.model("User", UserSchema);
