const mongoose = require("mongoose");
const ALLOWED_CATEGORIES = ["fantasy", "horror", "scifi", "romance", "history"];

const BookSchema = new mongoose.Schema(
  {
    asin: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ALLOWED_CATEGORIES,
      required: true, // Corretto
    },
    price: {
      type: mongoose.Types.Decimal128,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: false,
      default: "https://placehold.co/600x400",
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "CommentsModel" }],
  },
  { timestamps: true, strict: true } // Corretto
);

module.exports = mongoose.model("booksModel", BookSchema, "books");
