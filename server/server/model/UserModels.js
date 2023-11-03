const mongoose = require("mongoose");

let userSchema = mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  userImage: {
    type: String,
    required: false,
  },
  verified: {
    type: Boolean,
    required: true,
  },
});

let UserModels = mongoose.model("user", userSchema);
module.exports = UserModels;
