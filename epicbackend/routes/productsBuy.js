const express = require("express");
const cart = express.Router();
const CartModel = require("../models/cartmodel");
const BooksModel = require("../models/Bookmodel");

cart.post("/cart/add", async (req, res) => {
  const { userId, items } = req.body;

  try {
    console.log("Request body received:", req.body);

    if (!items || items.length === 0) {
      console.log("No items provided in the cart.");
      return res
        .status(400)
        .send({ statusCode: 400, message: "No items provided" });
    }

    for (let i = 0; i < items.length; i++) {
      console.log(`Looking for book with ID: ${items[i].bookId}`);
      const book = await BooksModel.findById(items[i].bookId);

      if (!book) {
        console.log(`Book with ID ${items[i].bookId} not found.`);
        return res.status(404).send({
          statusCode: 404,
          message: `Book with ID ${items[i].bookId} not found`,
        });
      }
    }

    let cart = await CartModel.findOne({ userId });

    if (cart) {
      console.log("Found existing cart:", cart);

      for (let i = 0; i < items.length; i++) {
        const book = await BooksModel.findById(items[i].bookId);
        if (!book) {
          console.log(`Error: Book with ID ${items[i].bookId} not found.`);
          return res
            .status(404)
            .send({ statusCode: 404, message: "Book not found" });
        }

        const existingItem = cart.items.find(
          (item) => item.bookId.toString() === items[i].bookId
        );

        if (existingItem) {
          existingItem.quantity += items[i].quantity;
        } else {
          cart.items.push({
            bookId: items[i].bookId,
            quantity: items[i].quantity,
            price: book.price,
          });
        }

        cart.totalPrice += book.price * items[i].quantity;
      }

      await cart.save();
      console.log("Cart updated successfully.");
      res.status(200).send({ statusCode: 200, message: "Books added to cart" });
    } else {
      console.log("No existing cart found, creating a new one.");

      const newCartItems = await Promise.all(
        items.map(async (item) => {
          const book = await BooksModel.findById(item.bookId);
          if (!book) {
            console.log(`Error: Book with ID ${item.bookId} not found.`);
            return null;
          }
          return {
            bookId: item.bookId,
            quantity: item.quantity,
            price: book.price,
          };
        })
      );

      const validItems = newCartItems.filter((item) => item !== null);

      const cart = new CartModel({
        userId,
        items: validItems,
        totalPrice: validItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ),
      });

      await cart.save();
      console.log("New cart created successfully.");
      res.status(200).send({ statusCode: 200, message: "Books added to cart" });
    }
  } catch (error) {
    console.error("Error adding to cart:", error); // Log dell'errore completo
    res.status(500).send({
      statusCode: 500,
      message: "Error adding to cart",
      error: error.message,
    });
  }
});

module.exports = cart;
