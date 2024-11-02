/*const express = require("express");
const users = express.Router();
const UserModel = require("../models/Usersmodel");
const validateUserMiddlware = require("../middlewere/validateUserMiddlewere");

users.get("/users", async (req, res) => {
  try {
    const users = await UserModel.find();
    if (users.length === 0) {
      return res.status(404).send({
        statusCode: 404,
        message: "User not found",
      });
    }
    res.status(200).send({
      statusCode: 200,
      users,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Oops, something went wrong",
    });
  }
});

users.get("/users/:userId", async (req, res, next) => {
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).send({
      statusCode: 400,
      message: "User ID is required",
    });
  }
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).send({
        statusCode: 404,
        message: "User ID not Found",
      });
    }
    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
});

users.post("/users/create", [validateUserMiddlware], async (req, res, next) => {
  console.log(req.body);
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
      message: "User saved successfulluy",
      user,
    });
  } catch (error) {
    next(error);
  }
});

users.patch("/users/update/:userId", async (req, res, next) => {
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).send({
      statusCode: 400,
      message: "User ID is required",
    });
  }
  const userExist = await UserModel.findById(userId);
  if (!userExist) {
    return res.status(400).send({
      statusCode: 400,
      message: "User not found with the given userId",
    });
  }
  try {
    const updateUserData = req.body;
    const options = { new: true };
    const result = await UserModel.findByIdAndUpdate(
      userId,
      updateUserData,
      options
    );

    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

users.delete("/users/delete/:userId", async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).send({
      statusCode: 400,
      message: "User ID is required",
    });
  }

  try {
    const user = await UserModel.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).send({
        statusCode: 404,
        message: "User not found with the given userId",
      });
    }

    res.status(200).send({
      statusCode: 200,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Oops, something went wrong",
    });
  }
});

module.exports = users;
*/

const express = require("express");
const users = express.Router();
const UserModel = require("../models/Usersmodel");
const validateUserMiddleware = require("../middlewere/validateUserMiddlewere");

// Ottieni i dettagli dell'utente autenticato
users.get("/user", async (req, res, next) => {
  try {
    const userId = req.userId; // Assumi che `userId` sia impostato tramite autenticazione (ad esempio, token JWT)

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

// Ottieni tutti gli utenti
users.get("/users", async (req, res, next) => {
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
    next(error); // Passa l'errore al middleware di gestione degli errori
  }
});

// Ottieni utente per ID
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
    next(error); // Passa l'errore al middleware di gestione degli errori
  }
});

// Crea un nuovo utente
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
      next(error); // Passa l'errore al middleware di gestione degli errori
    }
  }
);

// Aggiorna un utente esistente per ID
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
    next(error); // Passa l'errore al middleware di gestione degli errori
  }
});

// Elimina un utente per ID
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
    next(error); // Passa l'errore al middleware di gestione degli errori
  }
});

module.exports = users;
