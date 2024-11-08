const express = require("express");
const Stripe = require("stripe");
const stripe = Stripe("your-stripe-secret-key"); // Inserisci la tua chiave segreta di Stripe

const CartModel = require("../models/cartmodel"); // Modello del carrello
const cart = express.Router();

// Endpoint per checkout del carrello
cart.post("/cart/checkout", async (req, res) => {
  const { userId } = req.body; // Ottieni l'ID dell'utente dalla richiesta

  try {
    // Trova il carrello dell'utente
    const cart = await CartModel.findOne({ userId });

    if (!cart || cart.items.length === 0) {
      return res
        .status(400)
        .send({ statusCode: 400, message: "Cart is empty" }); // Controlla se il carrello è vuoto
    }

    // Crea la sessione di pagamento su Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"], // Metodo di pagamento accettato
      line_items: cart.items.map((item) => ({
        price_data: {
          currency: "usd", // Imposta la valuta
          product_data: {
            name: item.bookId.title, // Nome del libro
            images: [item.bookId.image], // Immagine del libro, se disponibile
          },
          unit_amount: parseInt(item.price * 100), // Prezzo in centesimi (Stripe accetta centesimi)
        },
        quantity: item.quantity, // Quantità di ogni libro
      })),
      mode: "payment", // Modalità di pagamento
      success_url: `${process.env.CLIENT_URL}/success`, // URL di successo
      cancel_url: `${process.env.CLIENT_URL}/cancel`, // URL di cancellazione
    });

    // Restituisci l'URL della sessione di pagamento
    res.status(200).send({ url: session.url });
  } catch (error) {
    // Gestione degli errori
    console.error(error);
    res
      .status(500)
      .send({ statusCode: 500, message: "Error processing payment" });
  }
});

module.exports = cart;
