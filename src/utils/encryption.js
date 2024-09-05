const crypto = require('crypto');
const dotenv = require('dotenv');
const path = require('path');

// Lade die Umgebungsvariablen aus der .env-Datei
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Stelle sicher, dass der ENCRYPTION_KEY 64 Hex-Zeichen lang ist
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY; // Sollte 32 Bytes (64 Hex-Zeichen) lang sein
const IV_LENGTH = 16; // Initialisierungsvektor Länge für AES-256

function encrypt(text) {
    let iv = crypto.randomBytes(IV_LENGTH); // Generiere einen zufälligen IV
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY, 'hex'), iv); // Erstelle Cipher mit dem ENCRYPTION_KEY
    let encrypted = cipher.update(text); // Verschlüssele den Text

    encrypted = Buffer.concat([encrypted, cipher.final()]); // Füge die verschlüsselten Teile zusammen

    return iv.toString('hex') + ':' + encrypted.toString('hex'); // Gebe den IV und den verschlüsselten Text zurück
}

function decrypt(text) {
    let textParts = text.split(':');
    let iv = Buffer.from(textParts.shift(), 'hex'); // Extrahiere den IV
    let encryptedText = Buffer.from(textParts.join(':'), 'hex'); // Extrahiere den verschlüsselten Text
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY, 'hex'), iv); // Erstelle Decipher mit dem ENCRYPTION_KEY
    let decrypted = decipher.update(encryptedText); // Entschlüssele den Text

    decrypted = Buffer.concat([decrypted, decipher.final()]); // Füge die entschlüsselten Teile zusammen

    return decrypted.toString(); // Gebe den entschlüsselten Text zurück
}

module.exports = { encrypt, decrypt };
