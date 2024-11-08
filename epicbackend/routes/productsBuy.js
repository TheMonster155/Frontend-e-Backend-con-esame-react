const express = require("express");
const cart = express.Router();
const CartModel = require("../models/cartmodel");
const BooksModel = require("../models/Bookmodel");

// Aggiungi un libro al carrello
cart.post("/cart/add", async (req, res) => {
  const { userId, bookId, quantity } = req.body;

  try {
    const book = await BooksModel.findById(bookId);
    if (!book) {
      return res
        .status(404)
        .send({ statusCode: 404, message: "Book not found" });
    }

    const cart = await CartModel.findOne({ userId });

    if (cart) {
      const existingItem = cart.items.find(
        (item) => item.bookId.toString() === bookId
      );
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ bookId, quantity, price: book.price });
      }
      cart.totalPrice += book.price * quantity;
      await cart.save();
    } else {
      const newCart = new CartModel({
        userId,
        items: [{ bookId, quantity, price: book.price }],
        totalPrice: book.price * quantity,
      });
      await newCart.save();
    }

    res.status(200).send({ statusCode: 200, message: "Book added to cart" });
  } catch (error) {
    res.status(500).send({ statusCode: 500, message: "Error adding to cart" });
  }
});

// Rimuovi un libro dal carrello
cart.delete("/cart/remove/:bookId", async (req, res) => {
  const { userId } = req.body;
  const { bookId } = req.params;

  try {
    const cart = await CartModel.findOne({ userId });

    if (!cart) {
      return res
        .status(404)
        .send({ statusCode: 404, message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.bookId.toString() === bookId
    );
    if (itemIndex > -1) {
      cart.totalPrice -=
        cart.items[itemIndex].price * cart.items[itemIndex].quantity;
      cart.items.splice(itemIndex, 1);
      await cart.save();
      res
        .status(200)
        .send({ statusCode: 200, message: "Item removed from cart" });
    } else {
      res
        .status(404)
        .send({ statusCode: 404, message: "Item not found in cart" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ statusCode: 500, message: "Error removing from cart" });
  }
});
module.exports = cart;
