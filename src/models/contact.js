// src/models/contact.js
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    company: { type: String },
    message: { type: String, required: true },
    privacy: { type: Boolean, required: true },
    timestamp: { type: String, required: true }
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
