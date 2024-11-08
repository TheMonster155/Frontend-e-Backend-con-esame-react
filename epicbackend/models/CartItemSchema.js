const mongoose = require("mongoose");

const CartItemSchema = new mongoose.Schema(
  {
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "booksModel",
      required: true,
    },
    quantity: { type: Number, required: true, default: 1 },
    price: { type: mongoose.Types.Decimal128, required: true },
  },
  { timestamps: true }
);

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      required: true,
    },
    items: [CartItemSchema],
    totalPrice: { type: mongoose.Types.Decimal128, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CartModel", CartSchema);
