const express = require("express");
const users = express.Router();
const UserModel = require("../models/Usersmodel");
const validateUserMiddleware = require("../middlewere/validateUserMiddlewere");
const verificyToken = require("../middlewere/verificyToken");

users.get("/user", async (req, res, next) => {
  try {
    //const userId = req.userId;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).send({
        statusCode: 404,
        message: "Utente non trovato",
      });
    }
    res.status(200).send({
      statusCode: 200,
      user,
    });
  } catch (error) {
    next(error);
  }
});

users.get("/users", [verificyToken], async (req, res, next) => {
  try {
    const usersList = await UserModel.find();
    if (usersList.length === 0) {
      return res.status(404).send({
        statusCode: 404,
        message: "Nessun utente trovato",
      });
    }
    res.status(200).send({
      statusCode: 200,
      users: usersList,
    });
  } catch (error) {
    next(error);
  }
});

users.get("/users/:userId", async (req, res, next) => {
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).send({
      statusCode: 400,
      message: "È richiesto l'ID utente",
    });
  }
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).send({
        statusCode: 404,
        message: "ID utente non trovato",
      });
    }
    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
});

users.post(
  "/users/create",
  [validateUserMiddleware],
  async (req, res, next) => {
    const newUser = new UserModel({
      name: req.body.name,
      surname: req.body.surname,
      dob: new Date(req.body.dob),
      email: req.body.email,
      password: req.body.password,
      username: req.body.username,
      gender: req.body.gender,
      address: req.body.address,
    });
    try {
      const user = await newUser.save();
      res.status(201).send({
        statusCode: 201,
        message: "Utente salvato con successo",
        user,
      });
    } catch (error) {
      next(error);
    }
  }
);

users.patch("/users/update/:userId", async (req, res, next) => {
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).send({
      statusCode: 400,
      message: "È richiesto l'ID utente",
    });
  }

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(userId, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).send({
        statusCode: 404,
        message: "Utente non trovato con l'ID fornito",
      });
    }
    res.status(200).send(updatedUser);
  } catch (error) {
    next(error);
  }
});

users.delete("/users/delete/:userId", async (req, res, next) => {
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).send({
      statusCode: 400,
      message: "È richiesto l'ID utente",
    });
  }

  try {
    const user = await UserModel.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).send({
        statusCode: 404,
        message: "Utente non trovato con l'ID fornito",
      });
    }
    res.status(200).send({
      statusCode: 200,
      message: "Utente eliminato con successo",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = users;
