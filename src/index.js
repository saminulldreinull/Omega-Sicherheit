const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const User = require('./models/user');

// Laden der Umgebungsvariablen aus der .env-Datei
dotenv.config({ path: path.resolve(__dirname, '../.env') });

console.log('EMAIL:', process.env.EMAIL);
console.log('EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD);

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

// MongoDB Verbindung
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Mit MongoDB verbunden');
  })
  .catch(err => {
    console.error('MongoDB Verbindungsfehler:', err);
  });

// Route für das Senden der E-Mail
app.post('/send-email', async (req, res) => {
    const { name, email, company, message, privacy } = req.body;

    if (!privacy) {
        return res.status(400).send('Datenschutzerklärung muss akzeptiert werden.');
    }

    // Neuen Nutzer erstellen und speichern
    const user = new User({ name, email, company, message, privacy });
    try {
        await user.save();
        console.log('Nutzer erfolgreich gespeichert');
    } catch (error) {
        console.error('Fehler beim Speichern des Nutzers:', error);
        return res.status(500).send('Fehler beim Speichern des Nutzers.');
    }

    // Konfigurieren des Transporters für Nodemailer
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    // E-Mail-Optionen definieren (E-Mail an Sie)
    const mailOptionsToYou = {
        from: email,
        to: process.env.EMAIL,
        subject: `Neue Nachricht von ${name} (${company})`,
        text: `Name: ${name}\nEmail: ${email}\nCompany: ${company}\nMessage: ${message}`
    };

    // E-Mail-Optionen definieren (Bestätigung an den Absender)
    const mailOptionsToSender = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Ihre Nachricht an Omega Security GmbH',
        text: `Hallo ${name},\n\nwir haben Ihre Nachricht erhalten und werden uns in Kürze bei Ihnen melden.\n\nMit freundlichen Grüßen,\nOmega Security GmbH`
    };

    // Senden der E-Mail an Sie
    transporter.sendMail(mailOptionsToYou, (error, info) => {
        if (error) {
            console.error('Fehler beim Senden der E-Mail an Sie:', error);
            return res.status(500).send('Fehler beim Senden der E-Mail.');
        }
        console.log('E-Mail an Sie erfolgreich gesendet:', info.response);

        // Senden der Bestätigungs-E-Mail an den Absender
        transporter.sendMail(mailOptionsToSender, (error, info) => {
            if (error) {
                console.error('Fehler beim Senden der Bestätigungs-E-Mail:', error);
                return res.status(500).send('Fehler beim Senden der Bestätigungs-E-Mail.');
            }
            console.log('Bestätigungs-E-Mail erfolgreich gesendet:', info.response);
            res.status(200).send('E-Mail erfolgreich gesendet!');
        });
    });
});

// Route, um die index.html Datei zu bedienen
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Route, um alle Benutzer zu holen und zu entschlüsseln
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        users.forEach(user => user.decryptFields());
        res.status(200).json(users);
    } catch (error) {
        console.error('Fehler beim Abrufen der Nutzer:', error);
        res.status(500).send('Fehler beim Abrufen der Nutzer.');
    }
});

// Route, um einen spezifischen Benutzer zu holen und zu entschlüsseln
app.get('/users/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('Benutzer nicht gefunden');
        }
        user.decryptFields();
        res.status(200).json(user);
    } catch (error) {
        console.error('Fehler beim Abrufen des Nutzers:', error);
        res.status(500).send('Fehler beim Abrufen des Nutzers.');
    }
});

// Starten des Servers
app.listen(port, () => {
    console.log(`Server läuft auf Port ${port}`);
});
