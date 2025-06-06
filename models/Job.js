const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Please provide the companty name"],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, "Provide the positon"],
      maxlength: 50,
    },
    status: {
      type: String,
      enum: ["Interview", "declined", "pending"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);
