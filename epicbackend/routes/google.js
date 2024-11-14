

const express = require("express");
const session = require("express-session");
const passport = require("passport");
const google = express.Router();
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");
require("dotenv").config();

const UserModel = require("../models/Usersmodel");

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
      try {
        let user = await UserModel.findOne({ email: profile._json.email });

        if (!user) {
          const { _json: googleUser } = profile;
          const userToSave = new UserModel({
            name: googleUser.given_name,
            surname: googleUser.family_name,
            email: googleUser.email,
            dob: new Date(),
            password: "123456789",
            username: `${googleUser.given_name}_${googleUser.family_name}`,
          });
          user = await userToSave.save();
        }
        return done(null, user);
      } catch (error) {
        console.log(error);
        return done(error, null);
      }
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
    
    // Costruzione del payload per il token JWT
    const tokenPayload = {
      name: user.name,
      surname: user.surname,
      email: user.email,
      _id: user._id,
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET);
    const redirectUrl = `${process.env.FRONTEND_URL}/success?token=${encodeURIComponent(token)}`;
    
    res.redirect(redirectUrl); // Reindirizza alla pagina con il token
  }
);

google.get("/logout", (req, res) => {
  req.logout(() => {
    req.session.destroy((err) => {
      if (err) {
        console.log("Errore durante la distruzione della sessione:", err);
        return res.redirect("/");
      }
      res.clearCookie("connect.sid"); // Cancella il cookie della sessione
      res.redirect(`${process.env.FRONTEND_URL}/login`); // Reindirizza alla pagina di login sul frontend
    });
  });
});

module.exports = google;
