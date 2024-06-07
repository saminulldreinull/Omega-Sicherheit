const express = require("express");
const { check, validationResult } = require('express-validator');
const router = express.Router();
const { sendEmail, getDecryptedContacts } = require("../controllers/contactController");
const authMiddleware = require("../middleware/auth");

const validateContactForm = [
  check('salutation').isIn(['Herr', 'Frau']).withMessage('Anrede muss Herr oder Frau sein'),
  check('name').isLength({ min: 2, max: 50 }).withMessage('Der Name muss zwischen 2 und 50 Zeichen lang sein'),
  check('email').isEmail().withMessage('Muss eine gültige E-Mail-Adresse sein'),
  check('message').isLength({ min: 10, max: 500 }).withMessage('Die Nachricht muss zwischen 10 und 500 Zeichen lang sein'),
  check('privacy').equals('on').withMessage('Datenschutzerklärung muss akzeptiert werden')
];

// Öffentliche Route für das Kontaktformular
router.post("/send-email", validateContactForm, sendEmail);

// Private Route zum Abrufen der Kontakte
router.get("/get-decrypted-contacts", authMiddleware, getDecryptedContacts);

module.exports = router;
