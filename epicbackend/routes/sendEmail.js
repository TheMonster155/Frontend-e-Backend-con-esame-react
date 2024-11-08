const express = require("express");
//const nodemailer = require("nodemailer");
const email = express.Router();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

email.post("/sendEmail", async (req, res) => {
  const { email: userEmail, message } = req.body;

  //TODO:Esempio come fare il todo
  // cambiare l erroere, che specifica utennte gia registrato

  /*
  const msg = {
    to: userEmail, // L'email inserita dall'utente
    from: "anass.vivaace@hotmail.it", // Email verificata su SendGrid
    subject: "Nuovo messaggio dal modulo di contatto",
    text: `Messaggio: ${message}`, // Messaggio dell'utente
    html: `<p>Messaggio: <strong>${message}</strong></p>`, // Stessa cosa in HTML
  };
  */
  const msg = {
    to: userEmail, // The email provided by the user
    from: "anass.vivaace@hotmail.it", // Verified email on SendGrid
    subject: "New Message from the Contact Form",
    text: `Your message has been received:\n\n${message}\n\nWe will respond as soon as possible.`, // User's message
    html: `
      <p>Your message has been received.</p>
      <p>Here's what you wrote:</p>
      <p><strong>${message}</strong></p>
      <p>We will respond as soon as possible.</p>
    `, // Same thing in HTML
  };

  try {
    await sgMail.send(msg);
    res
      .status(200)
      .send({ statusCode: 200, message: "Email inviata con successo" });
  } catch (error) {
    console.error(
      "Errore nell'invio dell'email:",
      error.response ? error.response.body : error
    );
    res
      .status(500)
      .send({ statusCode: 500, message: "Errore nell'invio dell'email" });
  }
});

/*
email.post("/sendEmail", async (req, res) => {
  const msg = {
    to: "schmitanna90@gmail.com", // Change to your recipient
    from: "anass.vivaace@hotmail.it", // Change to your verified sender
    subject: "Sending with SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  };

  try {
    await sgMail.send(msg);
    res
      .status(200)
      .send({ statusCode: 200, message: "Email sent successfully" });
  } catch (error) {
    next(error);
  }
});
*/

module.exports = email;

/*

quansto con nodmailder e + ethereal mail
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "brennon.turcotte@ethereal.email",
    pass: "ygpy7GzRtU7x964H4W",
  },
});

email.post("/sendEmail", async (req, res) => {
  const { recipient, subject, text } = req.body;

  const mailOptions = {
    from: "pippo@pippo.com",
    to: recipient,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send({
        statusCode: 500,
        message: "Impossible to send email",
      });
    } else {
      console.log("Email sent successfully");
      res.status(200).send({
        statusCode: 200,
        message: "Email sent successfully",
      });
    }
  });
});

module.exports = email;
*/
