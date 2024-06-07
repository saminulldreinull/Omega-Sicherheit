const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    salutation: { 
        type: String, 
        required: true,
        enum: ['Herr', 'Frau']
    },
    name: { 
        type: String, 
        required: true,
        minlength: 2,
        maxlength: 50
    },
    email: { 
        type: String, 
        required: true,
        match: [/^\S+@\S+\.\S+$/, 'is invalid']
    },
    company: { 
        type: String,
        maxlength: 100
    },
    message: { 
        type: String, 
        required: true,
        minlength: 10,
        maxlength: 500
    },
    privacy: { 
        type: Boolean, 
        required: true 
    },
    timestamp: { 
        type: Date, 
        default: Date.now, 
        required: true 
    }
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
