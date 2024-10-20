const mongoose = require("mongoose");
const ALLOWED_cATEGORIES = ["fantasy", "horror", "scifi", "romance", "history"];

const BookSchema = new mongoose.Schema(
  {
    asin: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ALLOWED_cATEGORIES,
      require: true,
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
  },
  { timeseries: true, strict: true }
);

module.exports = mongoose.model("booksModel", BookSchema, "books");