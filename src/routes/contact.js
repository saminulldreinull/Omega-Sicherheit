const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const moment = require("moment");
const Contact = require("../models/contact");
const { encrypt, decrypt } = require("../utils/encryption");
const authMiddleware = require("../middleware/auth");

const sendEmail = async (req, res) => {
  const { salutation, name, email, company, message, privacy } = req.body;

  if (privacy !== "on") {
    return res.status(400).send("Datenschutzerklärung muss akzeptiert werden.");
  }

  const encryptedMessage = encrypt(message);
  const timestamp = moment().format("DD.MM.YYYY HH:mm:ss");

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
    console.log("Kontakt erfolgreich gespeichert");
  } catch (error) {
    console.error("Fehler beim Speichern des Kontakts:", error);
    return res.status(500).send("Fehler beim Speichern des Kontakts.");
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptionsToYou = {
    from: email,
    to: process.env.EMAIL,
    subject: `Nachricht von ${salutation} ${name} (${company})`,
    html: `<p>${salutation} ${name} <br>(Unternehmen: ${company})<br> schrieb am ${timestamp} folgende Nachricht:</p>
           <p>,,${message}"</p>
           <p>Email: ${email}</p>
           <p style="font-size: 10px;">Dies ist eine automatisch erstellte Mail und wurde durch die Nutzung unseres auf unserer unternehmenseigenen Website befindlichen Kontaktformulars initiiert.</p>`,
  };

  const salutationFormatted =
    salutation === "Herr" ? "Sehr geehrter Herr" : "Sehr geehrte Frau";
  const mailOptionsToSender = {
    from: process.env.EMAIL,
    to: email,
    subject: "Ihre Nachricht an Omega Security GmbH",
    html: `<p>${salutationFormatted} ${name},</p>
           <p>wir haben Ihre Nachricht erhalten und werden uns in Kürze bei Ihnen melden.</p>
           <p>Mit freundlichen Grüßen,<br>Omega Security GmbH</p>`,
  };

  try {
    await transporter.sendMail(mailOptionsToYou);
    console.log("E-Mail an Sie erfolgreich gesendet");

    await transporter.sendMail(mailOptionsToSender);
    console.log("Bestätigungs-E-Mail erfolgreich gesendet");

    res.status(200).send("E-Mail erfolgreich gesendet!");
  } catch (error) {
    console.error("Fehler beim Senden der E-Mail:", error);
    res.status(500).send("Fehler beim Senden der E-Mail.");
  }
};

const getDecryptedContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    const decryptedContacts = contacts.map((contact) => ({
      ...contact._doc,
      message: decrypt(contact.message),
    }));
    res.status(200).json(decryptedContacts);
  } catch (error) {
    console.error("Fehler beim Abrufen der Kontakte:", error);
    res.status(500).send("Fehler beim Abrufen der Kontakte.");
  }
};

// Öffentliche Route für das Kontaktformular
router.post("/send-email", sendEmail);

// Private Route zum Abrufen der Kontakte
router.get("/get-decrypted-contacts", authMiddleware, getDecryptedContacts);

module.exports = router;
