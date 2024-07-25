require('dotenv').config();
const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const multer = require('multer');
const upload = multer();

const app = express();

// Sicherheitsheader hinzufügen
app.use(helmet());

// Angepasste Content Security Policy (CSP)
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", 'cdn.jsdelivr.net', 'cdnjs.cloudflare.com', 'ajax.googleapis.com', 'maxcdn.bootstrapcdn.com', 'unpkg.com', 'stackpath.bootstrapcdn.com', 'code.jquery.com'],
    styleSrc: ["'self'", "'unsafe-inline'", 'fonts.googleapis.com', 'cdnjs.cloudflare.com', 'maxcdn.bootstrapcdn.com', 'stackpath.bootstrapcdn.com'],
    imgSrc: ["'self'", 'data:', 'cdn.jsdelivr.net', 'cdnjs.cloudflare.com'],
    connectSrc: ["'self'", 'api.example.com'],
    fontSrc: ["'self'", 'fonts.gstatic.com', 'cdnjs.cloudflare.com', 'maxcdn.bootstrapcdn.com'],
    objectSrc: ["'none'"],
    mediaSrc: ["'self'"],
    frameSrc: ["'none'"]
  }
}));


// CORS-Konfiguration
app.use(cors());

// Rate Limiting für Anmelde- und Registrierungsrouten
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 Minuten
  max: 100, // Beschränkung auf 100 Anfragen pro IP und Fenster
  message: 'Zu viele Anfragen von dieser IP, bitte versuchen Sie es später erneut.',
});
app.use('/admin/login', limiter);
app.use('/admin/register', limiter);

// Middleware für JSON-Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging hinzufügen
app.use(morgan('combined'));

// Statische Dateien bereitstellen
app.use(express.static(path.join(__dirname, '..', 'public')));

const options = {
  key: fs.readFileSync(path.join(__dirname, '../server.key')),
  cert: fs.readFileSync(path.join(__dirname, '../server.cert')),
};

// Beispielrouten
const adminRoutes = require('./routes/admin');
const contactRoutes = require('./routes/contact');

app.use('/admin', adminRoutes);
app.use('/contact', contactRoutes);

// Verbindung zur MongoDB
mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 30000, // Timeout auf 30 Sekunden setzen
})
  .then(() => console.log('Mit MongoDB verbunden'))
  .catch(err => console.error('Fehler bei der Verbindung zur MongoDB:', err));

// HTTPS-Server starten
https.createServer(options, app).listen(process.env.PORT, () => {
  console.log(`Server läuft auf https://localhost:${process.env.PORT}`);
});
