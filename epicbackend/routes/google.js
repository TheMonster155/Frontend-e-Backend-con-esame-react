/*const express = require("express");
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
      callbackURL:
        "https://backend-con-esame-react.onrender.com/auth/google/callback",
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

    const redirectUrl = `${
      process.env.FRONTEND_URL
    }/success?token=${encodeURIComponent(JSON.stringify(googleToken))}`;
    res.redirect(redirectUrl);
  }
);

module.exports = google;
*/

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
      callbackURL:
        "https://backend-con-esame-react.onrender.com/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      let user = await UserModel.findOne({ googleId: profile.id });
      if (!user) {
        user = await UserModel.create({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          avatar: profile.photos[0].value,
        });
      }
      return done(null, user);
    }
  )
);

// Modifica l'autenticazione per disabilitare la gestione delle sessioni
google.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

google.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/", session: false }),
  (req, res) => {
    const user = req.user;
    const googleToken = jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const redirectUrl = `${
      process.env.FRONTEND_URL
    }/success?token=${encodeURIComponent(googleToken)}`;
    res.redirect(redirectUrl);
  }
);

module.exports = google;
