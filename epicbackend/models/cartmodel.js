import mongoose from "mongoose";
import books from "../routes/books";

const mongoose = require("mongoose");

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
