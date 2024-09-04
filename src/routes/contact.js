const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const moment = require('moment');
const { encrypt } = require('../utils/encryption');
const multer = require('multer');
const upload = multer();

// E-Mail senden Funktion
const sendEmail = async (req, res) => {
  const { salutation, name, email, company, message, privacy } = req.body;

  if (privacy !== 'on') {
    return res.status(400).send('Datenschutzerklärung muss akzeptiert werden.');
  }

  const timestamp = moment().toDate();

  // Konfiguration für NodeMailer
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.EMAIL, // Email-Adresse aus Umgebungsvariablen
      pass: process.env.EMAIL_PASSWORD, // Passwort aus Umgebungsvariablen
    },
  });

  // E-Mail an das Unternehmen
  const mailOptionsToYou = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: `Nachricht von ${salutation} ${name} (${company})`,
    html: `<p>${salutation} ${name} <br>(Unternehmen: ${company})<br> schrieb am ${moment(timestamp).format(
      'DD.MM.YYYY HH:mm:ss'
    )} folgende Nachricht:</p>
           <p>${message}</p>
           <p>Email: ${email}</p>
           <p style="font-size: 10px;">Dies ist eine automatisch erstellte Mail. Ihre Erstellung und ihre Zusendung wurde durch die Nutzung unseres auf unserer unternehmenseigenen Website befindlichen Kontaktformulars initiiert.</p>`,
  };

  // Bestätigungsmail an den Absender
  const salutationFormatted = salutation === 'Herr' ? 'Sehr geehrter Herr' : 'Sehr geehrte Frau';
  const mailOptionsToSender = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Ihre Nachricht an Omega Security GmbH',
    html: `<p>${salutationFormatted} ${name},</p>
           <p>wir haben Ihre Nachricht erhalten und werden uns in Kürze bei Ihnen melden.</p>
           <p>Mit freundlichen Grüßen,<br>Omega Security GmbH</p>`,
  };

  try {
    // E-Mails senden
    await transporter.sendMail(mailOptionsToYou);
    console.log('E-Mail an Sie erfolgreich gesendet');

    await transporter.sendMail(mailOptionsToSender);
    console.log('Bestätigungs-E-Mail erfolgreich gesendet');

    res.status(200).send('E-Mail erfolgreich gesendet!');
  } catch (error) {
    console.error('Fehler beim Senden der E-Mail:', error);
    res.status(500).send('Fehler beim Senden der E-Mail.');
  }
};

// Öffentliche Route für das Kontaktformular
router.post('/send-email', upload.none(), (req, res, next) => {
  // Hier wird der CSRF-Token validiert
  next();
}, sendEmail);

module.exports = router;
