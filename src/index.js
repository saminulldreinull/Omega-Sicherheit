const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const morgan = require('morgan');
const multer = require('multer');
const upload = multer();
const csurf = require('csurf');
const cookieParser = require('cookie-parser');
const path = require('path');

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
      fontSrc: [
        "'self'",
        'fonts.gstatic.com',
        'cdnjs.cloudflare.com',
        'maxcdn.bootstrapcdn.com',
      ],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  })
);

// CORS-Konfiguration
app.use(
  cors({
    origin: ['https://omega-sicherheit.com', 'https://www.omega-sicherheit.com', 'https://backend.omega-sicherheit.com'],
    credentials: true,
  })
);

// Cookie Parser verwenden, um CSRF-Token in Cookies zu speichern
app.use(cookieParser());

// CSRF-Token-Route definieren - diese Route sollte nicht durch die CSRF-Middleware geschützt sein
app.get('/get-csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// Middleware für JSON-Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CSRF-Middleware hinzufügen - NUR für POST- oder geschützte Routen
app.use(csurf({ cookie: true }));

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

// Root-Route hinzufügen
app.get('/', (req, res) => {
  res.send('Willkommen auf dem Omega-Sicherheits-Backend!');
});

// Beispielrouten
const contactRoutes = require('./routes/contact');

app.use('/contact', contactRoutes);

// Fehlerbehandlung für CSRF-Fehler und allgemeine Fehler
app.use((err, req, res, next) => {
  if (err.code === 'EBADCSRFTOKEN') {
    console.error('Ungültiger CSRF-Token:', err);  // CSRF-Fehler protokollieren
    res.status(403).send('Ungültiger CSRF-Token');
  } else {
    console.error('Ein unerwarteter Fehler ist aufgetreten:', err);  // Allgemeine Fehler protokollieren
    res.status(500).send('Interner Serverfehler');
  }
});

// HTTP-Server starten
const PORT = process.env.PORT || 8081;
const HOST = '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`Server läuft auf http://${HOST}:${PORT}`);
});
