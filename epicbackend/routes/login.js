const express = require("express");
const login = express.Router();
const UsersModel = require("../models/Usersmodel");
const TOKEN = require("../Token/token");
const isPasswordValid = (userPassword, requestPassword) => {
  if (userPassword === requestPassword) {
    return true;
  } else {
    return false;
  }
};

login.post("/login", async (request, response) => {
  try {
    const user = await UsersModel.findOne({ email: request.body.email });
    if (!user) {
      return response.status(404).send({
        statusCode: 404,
        message: "Utente non trovato con l'email fornita",
      });
    }
    const checkPassword = isPasswordValid(user.password, request.body.password);
    console.log(checkPassword);
    if (!checkPassword) {
      return response.status(403).send({
        statusCode: 403,
        message: "La password non è valida",
      });
    }

    console.log("Token value:", TOKEN); // Aggiungi questo log per controllare il valore

    // Invia il token solo nel corpo della risposta
    response.status(200).send({
      statusCode: 200,
      message: "sei logato",
      token: TOKEN,
    });
  } catch (error) {
    console.error("Error during login:", error); // Logga l'errore
    response.status(500).send({
      statusCode: 500,
      message: "Ops something went wrong: " + error.message, // Aggiungi il messaggio di errore
    });
  }
});

module.exports = login;
