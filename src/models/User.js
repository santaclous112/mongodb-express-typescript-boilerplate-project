const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  date: {
    type: Number,
    default: Date.now(),
  },

  admin: {
    type: String,
    default: "client",
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
