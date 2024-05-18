const express = require('express');
const router = express.Router();
const { sendEmail, getContacts } = require('../controllers/contactController');
const auth = require('../middleware/auth');

// Route to send an email (public)
router.post('/send-email', sendEmail);
// Route to get all contacts (protected)
router.get('/contacts', auth, getContacts);

module.exports = router;
