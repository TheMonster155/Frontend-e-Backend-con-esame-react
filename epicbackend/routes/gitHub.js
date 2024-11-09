const express = require("express");
const passport = require("passport");
const GithubStrategy = require("passport-github2").Strategy;
const github = express.Router();
require("dotenv").config();
const jwt = require("jsonwebtoken");
const session = require("express-session");

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
      return done(null, profile);
    }
  )
);

github.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user", "email"] }),
  async (req, res, next) => {
    console.log("ROTTA AUTH GITHUB", req.user);
  }
);

github.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  async (req, res, next) => {
    const user = req.user;
    console.log(user);

    const token = jwt.sign(user, process.env.JWT_SECRET);
    /*
    const redirectUrl = `https://frontend-con-esame-react.vercel.app/success?token=${encodeURIComponent(
      token
    )}`;
    */
    const redirectUrl = `${
      process.env.GITHUB_CLIENT_URL
    }/success?token=${encodeURIComponent(token)}`;
    res.redirect(redirectUrl);
  }
);

module.exports = github;
