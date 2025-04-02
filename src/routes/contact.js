const moment = require("moment");
const multer = require("multer");
const upload = multer();
const { encrypt } = require("../utils/encryption");
const getAccessToken = require("../utils/graphAuth");
const axios = require("axios");

module.exports = async (req, res) => {
  // Nur POST akzeptieren
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  // Parsen des Form-Data (falls nötig)
  await new Promise((resolve, reject) => {
    upload.none()(req, res, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });

  const { salutation, name, email, company, message, privacy } = req.body;

  if (privacy !== "on") {
    return res.status(400).send("Datenschutzerklärung muss akzeptiert werden.");
  }

  const encryptedMessage = encrypt(message);
  const timestamp = moment().toDate();
  const accessToken = await getAccessToken();

  const mailPayloadToOmega = {
    message: {
      subject: `Kontaktformular - Nachricht von ${salutation} ${name} (${company})`,
      body: {
        contentType: "HTML",
        content: `
          <p>${salutation} ${name} <br>(Unternehmen: ${company})<br> schrieb am ${moment(timestamp).format("DD.MM.YYYY HH:mm:ss")}:</p>
          <p>${message}</p>
          <p>Email: ${email}</p>
          <p style="font-size: 10px; color: #555;">
            Diese E-Mail wurde automatisch über das Kontaktformular auf www.omega-sicherheit.com versendet.
          </p>
        `
      },
      toRecipients: [
        {
          emailAddress: {
            address: process.env.EMAIL_SENDER
          }
        }
      ],
      from: {
        emailAddress: {
          name: "Omega Security GmbH",
          address: process.env.EMAIL_SENDER
        }
      }
    }
  };

  const salutationFormatted = salutation === "Herr" ? "Sehr geehrter Herr" : "Sehr geehrte Frau";

  const mailPayloadToSender = {
    message: {
      subject: "Ihre Nachricht an Omega Security GmbH",
      body: {
        contentType: "HTML",
        content: `
          <p>${salutationFormatted} ${name},</p>
          <p>wir haben Ihre Nachricht erhalten und melden uns in Kürze.</p>
          <p>Mit freundlichen Grüßen,<br>Omega Security GmbH</p>
          <p style="font-size: 10px; color: #555;">
            Diese E-Mail wurde automatisch über das Kontaktformular auf www.omega-sicherheit.com versendet.
          </p>
        `
      },
      toRecipients: [
        {
          emailAddress: {
            address: email
          }
        }
      ],
      from: {
        emailAddress: {
          name: "Omega Security GmbH",
          address: process.env.EMAIL_SENDER
        }
      }
    }
  };

  try {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    };

    await axios.post("https://graph.microsoft.com/v1.0/me/sendMail", mailPayloadToOmega, { headers });
    await axios.post("https://graph.microsoft.com/v1.0/me/sendMail", mailPayloadToSender, { headers });

    res.status(200).send("E-Mail erfolgreich gesendet!");
  } catch (error) {
    console.error("Fehler beim Senden über Graph API:", error.response?.data || error.message);
    res.status(500).send("Fehler beim E-Mail-Versand");
  }
};