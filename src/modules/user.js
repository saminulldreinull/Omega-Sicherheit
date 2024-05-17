const mongoose = require('mongoose');
const { encrypt, decrypt } = require('../utils/encryption');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    company: {
        type: String,
    },
    message: {
        type: String,
    },
    privacy: {
        type: Boolean,
        required: true,
    }
});

// Verschlüsseln der Felder vor dem Speichern
UserSchema.pre('save', function (next) {
    this.name = encrypt(this.name);
    this.email = encrypt(this.email);
    this.company = encrypt(this.company);
    this.message = encrypt(this.message);
    next();
});

// Entschlüsseln der Felder nach dem Abrufen
UserSchema.methods.decryptFields = function () {
    this.name = decrypt(this.name);
    this.email = decrypt(this.email);
    this.company = decrypt(this.company);
    this.message = decrypt(this.message);
};

module.exports = mongoose.model('User', UserSchema);
