const express = require("express");
//const nodemailer = require("nodemailer");
const email = express.Router();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

email.post("/sendEmail", async (req, res) => {
  const { email: userEmail, message } = req.body;

  const msg = {
    to: userEmail, 
    from: "anass.vivaace@hotmail.it", 
    subject: "Nuovo messaggio dal modulo di contatto",
    text: `Il tuo messaggio è stato ricevuto:\n\n${message}\n\nRisponderemo il prima possibile.`, 
    html: `
      <p>Il tuo messaggio è stato ricevuto.</p>
      <p>Ecco cosa hai scritto:</p>
      <p><strong>${message}</strong></p>
      <p>Risponderemo il prima possibile.</p>
    `, // La stessa cosa in HTML
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



module.exports = email;
