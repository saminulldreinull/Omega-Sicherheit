const { validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const moment = require('moment');
const Contact = require('../models/contact');
const { encrypt } = require('../utils/encryption');

const sendEmail = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { salutation, name, email, company, message, privacy } = req.body;

  if (privacy !== 'on') {
    return res.status(400).json({ message: 'Datenschutzerklärung muss akzeptiert werden.' });
  }

  const encryptedMessage = encrypt(message);
  const timestamp = new Date();

  const contact = new Contact({
    salutation,
    name,
    email,
    company,
    message: encryptedMessage,
    privacy: true,
    timestamp,
  });

  try {
    await contact.save();
  } catch (error) {
    return res.status(500).json({ message: 'Fehler beim Speichern des Kontakts.' });
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const mailOptionsToYou = {
    from: email,
    to: process.env.EMAIL,
    subject: `Neue Nachricht von ${salutation} ${name} (${company})`,
    html: `<p>${salutation} ${name} <br>(Unternehmen: ${company})<br> schrieb am ${moment(timestamp).format('DD.MM.YYYY HH:mm:ss')} folgende Nachricht:</p>
           <p>${message}</p>
           <p>Email: ${email}</p>
           <p style="font-size: 10px;">Dies ist eine automatisch erstellte Mail. Ihre Erstellung und ihre Zusendung wurde durch die Nutzung unseres auf unserer unternehmenseigenen Website befindlichen Kontaktformulars initiiert.</p>`
  };

  const salutationFormatted = salutation === "Herr" ? "Sehr geehrter Herr" : "Sehr geehrte Frau";
  const mailOptionsToSender = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Ihre Nachricht an Omega Security GmbH',
    html: `<p>${salutationFormatted} ${name},</p>
           <p>wir haben Ihre Nachricht erhalten und werden uns in Kürze bei Ihnen melden.</p>
           <p>Mit freundlichen Grüßen,<br>Omega Security GmbH</p>`
  };

  try {
    await transporter.sendMail(mailOptionsToYou);
    await transporter.sendMail(mailOptionsToSender);
    res.status(200).json({ message: 'E-Mail erfolgreich gesendet!' });
  } catch (error) {
    res.status(500).json({ message: 'Fehler beim Senden der E-Mail.' });
  }
};

module.exports = {
  sendEmail
};
