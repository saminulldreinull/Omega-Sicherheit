// src/index.js
const fs = require('fs');
const https = require('https');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

const adminRoutes = require('./routes/admin');
const contactRoutes = require('./routes/contact');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Mit MongoDB verbunden');
  })
  .catch(err => {
    console.error('MongoDB Verbindungsfehler:', err);
  });

app.use('/admin', adminRoutes);
app.use('/contact', contactRoutes);

const options = {
  key: fs.readFileSync('../server.key'),
  cert: fs.readFileSync('../server.cert')
};

https.createServer(options, app).listen(443, () => {
  console.log('HTTPS Server läuft auf Port 443');
});

app.listen(port, () => {
  console.log(`HTTP Server läuft auf Port ${port}`);
});
