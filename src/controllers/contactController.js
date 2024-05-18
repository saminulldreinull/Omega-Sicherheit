const nodemailer = require('nodemailer');
const Contact = require('../models/contact');

const sendEmail = async (req, res) => {
  const { name, email, company, message, privacy } = req.body;

  if (privacy !== 'on') {
    return res.status(400).send('Datenschutzerklärung muss akzeptiert werden.');
  }

  const contact = new Contact({
    name,
    email,
    company,
    message,
    privacy: true
  });

  try {
    await contact.save();
    console.log('Kontakt erfolgreich gespeichert');
  } catch (error) {
    console.error('Fehler beim Speichern des Kontakts:', error);
    return res.status(500).send('Fehler beim Speichern des Kontakts.');
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
    subject: `Neue Nachricht von ${name} (${company})`,
    text: `Name: ${name}\nEmail: ${email}\nCompany: ${company}\nMessage: ${message}`
  };

  const mailOptionsToSender = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Ihre Nachricht an Omega Security GmbH',
    text: `Hallo ${name},\n\nwir haben Ihre Nachricht erhalten und werden uns in Kürze bei Ihnen melden.\n\nMit freundlichen Grüßen,\nOmega Security GmbH`
  };

  transporter.sendMail(mailOptionsToYou, (error, info) => {
    if (error) {
      console.error('Fehler beim Senden der E-Mail an Sie:', error);
      return res.status(500).send('Fehler beim Senden der E-Mail.');
    }
    console.log('E-Mail an Sie erfolgreich gesendet:', info.response);

    transporter.sendMail(mailOptionsToSender, (error, info) => {
      if (error) {
        console.error('Fehler beim Senden der Bestätigungs-E-Mail:', error);
        return res.status(500).send('Fehler beim Senden der Bestätigungs-E-Mail.');
      }
      console.log('Bestätigungs-E-Mail erfolgreich gesendet:', info.response);
      res.status(200).send('E-Mail erfolgreich gesendet!');
    });
  });
};

const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    console.error('Fehler beim Abrufen der Kontakte:', error);
    res.status(500).send('Fehler beim Abrufen der Kontakte.');
  }
};

module.exports = {
  sendEmail,
  getContacts
};
