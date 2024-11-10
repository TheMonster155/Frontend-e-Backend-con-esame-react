/*const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assicurati che "User" sia il nome del modello utente
    required: true,
  },
  items: [
    {
      bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book", // Assicurati che "Book" sia il nome del modello libro
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  totalPrice: {
    type: Number,
    default: 0,
  },
});

const CartModel = mongoose.model("Cart", CartSchema,"carts");

module.exports = CartModel;
*/

const mongoose = require("mongoose");

// Schema del carrello
const CartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assicurati che "User" sia il nome del modello utente
    required: true,
  },
  items: [
    {
      bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book", // Assicurati che "Book" sia il nome del modello libro
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  totalPrice: {
    type: Number,
    default: 0,
  },
});

const CartModel = mongoose.model("Cart", CartSchema, "carts");
module.exports = CartModel;
