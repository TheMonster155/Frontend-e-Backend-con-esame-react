const express = require("express");
const cart = express.Router();
const CartModel = require("../models/cartmodel");
const BooksModel = require("../models/Bookmodel");

cart.post("/cart/add", async (req, res) => {
  const { userId, items } = req.body;

  try {
    console.log("Request body received:", req.body); // Log per controllare i dati inviati nel corpo della richiesta

    if (!items || items.length === 0) {
      console.log("No items provided in the cart.");
      return res
        .status(400)
        .send({ statusCode: 400, message: "No items provided" });
    }

    // Verifica che tutti i libri esistano nel database
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

      // Aggiungi i libri al carrello
      for (let i = 0; i < items.length; i++) {
        const book = await BooksModel.findById(items[i].bookId); // Recupera il libro ogni volta
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

      // Crea un nuovo carrello
      const newCartItems = await Promise.all(
        items.map(async (item) => {
          const book = await BooksModel.findById(item.bookId);
          if (!book) {
            console.log(`Error: Book with ID ${item.bookId} not found.`);
            return null; // Se il libro non esiste, restituisci null
          }
          return {
            bookId: item.bookId,
            quantity: item.quantity,
            price: book.price,
          };
        })
      );

      // Filtra gli oggetti null (libri non trovati)
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

/*
cart.post("/cart/add", async (req, res) => {
  const { userId, items } = req.body; // Recuperiamo direttamente "items" dal corpo della richiesta

  try {
    // Verifica che ogni bookId sia valido e che il libro esista
    for (let i = 0; i < items.length; i++) {
      const book = await BooksModel.findById(items[i].bookId);
      console.log(`Looking for book with ID: ${items[i].bookId}`);

      if (!book) {
        return res.status(404).send({
          statusCode: 404,
          message: `Book with ID ${items[i].bookId} not found`,
        });
      }
    }

    // Trova il carrello esistente per l'utente
    let cart = await CartModel.findOne({ userId });

    if (cart) {
      // Se il carrello esiste, aggiorna gli articoli
      for (let i = 0; i < items.length; i++) {
        const existingItem = cart.items.find(
          (item) => item.bookId.toString() === items[i].bookId
        );
        if (existingItem) {
          // Se il libro esiste, aggiorna la quantità
          existingItem.quantity += items[i].quantity;
        } else {
          // Altrimenti, aggiungi il nuovo libro
          cart.items.push({
            bookId: items[i].bookId,
            quantity: items[i].quantity,
            price: book.price,
          });
        }

        // Ricalcola il prezzo totale del carrello
        cart.totalPrice += book.price * items[i].quantity;
      }

      await cart.save();
    } else {
      // Se non esiste un carrello per l'utente, creane uno nuovo
      cart = new CartModel({
        userId,
        items: items.map((item) => ({
          bookId: item.bookId,
          quantity: item.quantity,
          price: book.price, // Assicurati di recuperare il prezzo corretto per ogni libro
        })),
        totalPrice: items.reduce(
          (total, item) => total + book.price * item.quantity,
          0
        ),
      });
      await cart.save();
    }

    res.status(200).send({ statusCode: 200, message: "Books added to cart" });
  } catch (error) {
    console.error("Error adding to cart:", error); // Log per errore
    res.status(500).send({ statusCode: 500, message: "Error adding to cart" });
  }
});
*/

/*const express = require("express");
const cart = express.Router();
const CartModel = require("../models/cartmodel");
const BooksModel = require("../models/Bookmodel");

cart.post("/cart/add", async (req, res) => {
  const { userId, bookId, quantity } = req.body;

  try {
    for (let i = 0; i < items.length; i++) {
      const book = await BooksModel.findById(items[i].bookId);
      console.log(`Looking for book with ID: ${items[i].bookId}`);

      if (!book) {
        return res
          .status(404)
          .send({
            statusCode: 404,
            message: `Book with ID ${items[i].bookId} not found`,
          });
      }
    }
    // Trova il carrello esistente per l'utente
    let cart = await CartModel.findOne({ userId });

    if (cart) {
      // Se il carrello esiste, cerca il libro all'interno del carrello
      const existingItem = cart.items.find(
        (item) => item.bookId.toString() === bookId
      );
      if (existingItem) {
        // Se il libro esiste, aggiorna la quantità
        existingItem.quantity += quantity;
      } else {
        // Altrimenti, aggiungi il nuovo libro
        cart.items.push({
          bookId,
          quantity,
          price: book.price,
        });
      }

      // Ricalcola il prezzo totale del carrello
      cart.totalPrice += book.price * quantity;
      await cart.save();
    } else {
      // Se non esiste un carrello per l'utente, creane uno nuovo
      cart = new CartModel({
        userId,
        items: [{ bookId, quantity, price: book.price }],
        totalPrice: book.price * quantity,
      });
      await cart.save();
    }

    res.status(200).send({ statusCode: 200, message: "Book added to cart" });
  } catch (error) {
    console.error("Error adding to cart:", error); // Log per errore
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
*/

/*
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
*/
