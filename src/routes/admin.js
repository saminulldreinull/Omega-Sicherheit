const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const {
    loginAdmin,
    registerAdmin,
    getUsers,
    getUser
} = require('../controllers/adminController');
const authMiddleware = require('../middleware/auth');

// Route für Admin-Registrierung mit Authentifizierung und Validierung
router.post('/register', authMiddleware, [
    check('email').isEmail().withMessage('Muss eine gültige E-Mail sein'),
    check('password').isLength({ min: 6 }).withMessage('Das Passwort muss mindestens 6 Zeichen lang sein'),
    check('name').notEmpty().withMessage('Name ist erforderlich'),
    check('privacy').isBoolean().withMessage('Datenschutzbestimmung muss akzeptiert werden')
], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}, registerAdmin);

// Route für Admin-Login mit Validierung
router.post('/login', [
    check('email').isEmail().withMessage('Muss eine gültige E-Mail sein'),
    check('password').notEmpty().withMessage('Passwort ist erforderlich')
], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}, loginAdmin);

// Route zum Abrufen aller Benutzer mit Authentifizierung
router.get('/users', authMiddleware, getUsers);

// Route zum Abrufen eines Benutzers anhand der ID mit Authentifizierung
router.get('/users/:id', authMiddleware, getUser);

module.exports = router;
