const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    salutation: { type: String, required: true }, // Neues Feld
    name: { type: String, required: true },
    email: { type: String, required: true },
    company: { type: String },
    message: { type: String, required: true },
    privacy: { type: Boolean, required: true },
    timestamp: { type: Date, default: Date.now, required: true } // Aktualisiertes Feld
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
