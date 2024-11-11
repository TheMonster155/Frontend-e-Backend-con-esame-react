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
    const { id, username } = request.body;
    console.log("/login/github");
    console.log(request.session);

    let user = await GithubSchema.findOne({ id });

    if (!user) {
      user = new GithubSchema({
        id,
        username,
        displayName: null,
      });
    }

    const userToken = jwt.sign(
      {
        name: user.username,
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
