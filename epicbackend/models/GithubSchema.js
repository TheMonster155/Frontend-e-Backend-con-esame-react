const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model("UserGithub", userSchema, "usersGithub");
