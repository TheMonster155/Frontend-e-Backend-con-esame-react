const express = require("express");
const passport = require("passport");
const GithubStrategy = require("passport-github2").Strategy;
const github = express.Router();
require("dotenv").config();
const jwt = require("jsonwebtoken");
const session = require("express-session");
const GithubSchema = require("../models/GithubSchema");

github.use(
  session({
    secret: process.env.GITHUB_CLIENT_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

github.use(passport.initialize());

github.use(passport.session());
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CLIENT_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("DATI UTENTE", profile);
      //localStorage.setItem("profile", JSON.stringify(profile));
      window.localStorage.setItem("profile", JSON.stringify(profile));
      const githunS = GithubSchema.findByIdAndUpdate(profile.id, profile, {
        upsert: true,
      });
      console.log(githunS);
      return done(null, profile);
    }
  )
);

github.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user", "email"] }),
  async (req, res, next) => {
    const redirectURl = `http://localhost:5173/success?user${encodeURIComponent(
      JSON.stringify(req.user)
    )}`;
    res.redirect(redirectURl);
  }
);

github.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  async (req, res, next) => {
    const user = req.user;

    const token = jwt.sign(user, process.env.JWT_SECRET);

    const redirectUrl = `http://localhost:5173/success?token=${encodeURIComponent(
      token
    )}`;
    res.redirect(redirectUrl);
  }
);

github.post("/login/github", async (request, response) => {
  try {
    // Recuperiamo i dati dell'utente dal body della richiesta
    const { id, username } = request.body;
    console.log("/login/github");
    console.log(request.session);

    // Verifica se l'utente esiste già nel database
    let user = await GithubSchema.findOne({ id });

    if (!user) {
      // Se l'utente non esiste, creiamo un nuovo utente con i dati ricevuti
      user = new GithubSchema({
        id,
        username,
        displayName: null, // Email impostata a null se non disponibile
      });

      // Tentiamo di salvare l'utente nel database
      /* await user
        .save()
        .then(() => {
          console.log("Utente salvato nel database");
        })
        .catch((error) => {
          console.error("Errore durante il salvataggio dell'utente:", error);
          return response.status(500).send({
            statusCode: 500,
            message:
              "Errore durante il salvataggio dell'utente: " + error.message,
          });
        }); */
    }

    // Creiamo il token JWT
    const userToken = jwt.sign(
      {
        name: user.username,
        _id: user._id, // Usiamo l'ID dell'utente dal database
      },
      process.env.JWT_SECRET,
      { expiresIn: "55m" } // Impostiamo la durata del token a 55 minuti
    );

    // Rispondiamo con il token e le informazioni dell'utente
    response
      .header("authorization", userToken) // Impostiamo il token come header
      .status(200)
      .send({
        statusCode: 200,
        message: "Login effettuato con successo",
        token: userToken,
        user: {
          name: user.username,
          _id: user.id,
        },
      });
  } catch (error) {
    console.error("Errore durante il login:", error);
    response.status(500).send({
      statusCode: 500,
      message: "Ops qualcosa è andato storto: " + error.message,
    });
  }
});

module.exports = github;

/*
github.post("/login/github", async (request, response) => {
  try {
    // Recuperiamo i dati dell'utente dal body della richiesta (dovrebbe contenere le informazioni ottenute da GitHub)
    const { githubId, username, profilePicture } = request.body;

    // Verifica se l'utente esiste già nel database
    let user = await Usersmodel.findOne({ githubId });

    if (!user) {
      // Se l'utente non esiste, creiamo un nuovo utente con i dati ricevuti
      user = new Usersmodel({
        githubId,
        username,
        email: null, // Impostiamo l'email a null se non disponibile
        profilePicture: profilePicture || "", // Se non è presente un'immagine, mettiamo una stringa vuota
      });

      await user.save();
    }

    // Creiamo un token JWT con le informazioni dell'utente
    const userToken = jwt.sign(
      {
        name: user.username,
        _id: user._id, // Utilizziamo l'ID dell'utente dal database, non GITHUB_CLIENT_ID
      },
      process.env.JWT_SECRET,
      { expiresIn: "55m" } // Impostiamo una durata del token di 55 minuti
    );

    // Rispondiamo con il token e le informazioni dell'utente
    response
      .header("authorization", userToken) // Impostiamo il token come header di autorizzazione
      .status(200)
      .send({
        statusCode: 200,
        message: "Login effettuato con successo",
        token: userToken,
        user: {
          name: user.username,
          _id: user._id,
        },
      });
  } catch (error) {
    console.error("Errore durante il login:", error);
    response.status(500).send({
      statusCode: 500,
      message: "Ops qualcosa è andato storto: " + error.message,
    });
  }
});
*/

/*
    

    const redirectUrl = `${
      process.env.GITHUB_CLIENT_URL
    }?token=${encodeURIComponent(token)}`;
    */
