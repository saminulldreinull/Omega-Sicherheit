require('dotenv').config();

if (!process.env.AZURE_CLIENT_ID || !process.env.AZURE_CLIENT_SECRET) {
  console.warn("⚠️  .env konnte nicht geladen werden oder ENV-Variablen fehlen!");
} else {
  console.log("✅ .env erfolgreich geladen");
}
const express = require('express');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const morgan = require('morgan');
const multer = require('multer');
const upload = multer();
const cookieParser = require('cookie-parser');

const app = express();

// Sicherheitsheader hinzufügen
app.use(helmet());

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: [
        "'self'",
        "'unsafe-inline'",
        "'unsafe-eval'",
        'cdn.jsdelivr.net',
        'cdnjs.cloudflare.com',
        'ajax.googleapis.com',
        'maxcdn.bootstrapcdn.com',
        'unpkg.com',
        'stackpath.bootstrapcdn.com',
        'code.jquery.com',
        'www.googletagmanager.com',
        'www.google-analytics.com',
      ],
      styleSrc: [
        "'self'",
        "'unsafe-inline'",
        'fonts.googleapis.com',
        'cdnjs.cloudflare.com',
        'maxcdn.bootstrapcdn.com',
        'stackpath.bootstrapcdn.com',
      ],
      imgSrc: [
        "'self'",
        'data:',
        'cdn.jsdelivr.net',
        'cdnjs.cloudflare.com',
        'www.google-analytics.com',
      ],
      connectSrc: [
        "'self'",
        'api.example.com',
        'www.google-analytics.com',
        'https://region1.google-analytics.com',
        'https://www.googletagmanager.com',
      ],
      fontSrc: ["'self'", 'fonts.gstatic.com', 'cdnjs.cloudflare.com', 'maxcdn.bootstrapcdn.com'],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  })
);

// CORS-Konfiguration
app.use(cors());

// Cookie Parser verwenden, um CSRF-Token in Cookies zu speichern
app.use(cookieParser());

// Middleware für JSON-Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging hinzufügen
app.use(morgan('combined'));

// Rate Limiting für Anmelde- und Registrierungsrouten
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 Minuten
  max: 100, // Beschränkung auf 100 Anfragen pro IP und Fenster
  message: 'Zu viele Anfragen von dieser IP, bitte versuchen Sie es später erneut.',
});
app.use('/admin/login', limiter);
app.use('/admin/register', limiter);

// Statische Dateien bereitstellen
app.use(express.static(path.join(__dirname, '..', 'public')));

// Beispielrouten
const contactRoutes = require('./routes/contact');

app.use('/contact', contactRoutes);

// HTTP-Server starten
const PORT = process.env.PORT || 5500;
const HOST = '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`Server läuft auf http://${HOST}:${PORT}`);
});
