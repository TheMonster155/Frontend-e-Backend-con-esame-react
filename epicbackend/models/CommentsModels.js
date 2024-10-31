const mongoose = require("mongoose");
const Usersmodel = require("./Usersmodel");
const comments = require("../routes/comments");

const commentsModels = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "userModel",
    },

    rate: {
      type: Number,
      require: true,
      default: 1,
      min: 1,
      max: 5,
    },

    Comment: {
      type: String,
      require: true,
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "booksModel",
    },
  },
  {
    timestamps: true,
    strict: true,
  }
);

module.exports = mongoose.model("CommentsModels", commentsModels, "comments");
