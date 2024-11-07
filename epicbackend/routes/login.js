const express = require("express");
const login = express.Router();
const UsersModel = require("../models/Usersmodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

login.post("/login", async (request, response) => {
  try {
    const user = await UsersModel.findOne({ email: request.body.email });
    if (!user) {
      return response.status(404).send({
        statusCode: 404,
        message: "Utente non trovato con l'email fornita",
      });
    }

    const checkPassword = await bcrypt.compare(
      request.body.password,
      user.password
    );

    if (!checkPassword) {
      return response.status(401).send({
        statusCode: 401,
        message: "Password or Email not valid",
      });
    }

    const userToken = jwt.sign(
      {
        name: user.name,
        surname: user.surname,
        email: user.email,
        _id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "55m" }
    );

    response
      .header("authorization", userToken)
      .status(200)
      .send({
        statusCode: 200,
        message: "sei logato",
        token: userToken,
        user: {
          name: user.name,
          surname: user.surname,
          email: user.email,
          _id: user._id,
        },
      });
  } catch (error) {
    console.error("Error during login:", error);
    response.status(500).send({
      statusCode: 500,
      message: "Ops something went wrong: " + error.message,
    });
  }
});

module.exports = login;
