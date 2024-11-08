const mongoose = require("mongoose");
const books = require("../routes/books"); // usa require invece di import
const CartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "usermodel",
  },
  books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "booksModel",
    },
  ],
});
