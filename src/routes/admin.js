// src/routes/admin.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { registerAdmin, loginAdmin, getUsers, getUser } = require('../controllers/adminController');

// Routen für Admin-Benutzer, die Authentifizierung erfordern
router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.get('/users', auth, getUsers); // Auth-Middleware angewendet
router.get('/users/:id', auth, getUser); // Auth-Middleware angewendet

module.exports = router;
