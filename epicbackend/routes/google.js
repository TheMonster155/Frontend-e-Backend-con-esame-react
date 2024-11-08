const express = require("express");
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const google = express.Router();
require("dotenv").config();
const UserModel = require("../models/Usersmodel");
const jwt = require("jsonwebtoken");
google.use(
  session({
    secret: process.env.GOOGLE_CLIENT_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

google.use(passport.initialize());
google.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

google.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

google.get(
  "/auth/google/callback",

  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    const user = req.user;
    const googleToken = jwt.sign(user, process.env.JWT_SECRET);
    if (!user) {
      return res.redirect("/");
    }

    const redirectUrl = `${
      process.env.FRONTEND_URL
    }/success?token=${encodeURIComponent(JSON.stringify(googleToken))}`;
    res.redirect(redirectUrl);
  }
);

module.exports = google;
