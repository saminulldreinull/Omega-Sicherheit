// src/routes/admin.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const AdminUser = require('../models/adminUser');
const authMiddleware = require('../middleware/auth.js');

const registerAdmin = async (req, res) => {
    const { adminUsername, adminPassword, email, password, name, privacy } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdminUser = new AdminUser({ email, password: hashedPassword, name, privacy });
        await newAdminUser.save();
        res.status(201).send('Admin Benutzer erfolgreich erstellt');
    } catch (error) {
        console.error('Fehler beim Erstellen des Admin Benutzers:', error);
        res.status(500).send('Serverfehler');
    }
};

const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const adminUser = await AdminUser.findOne({ email });

        if (!adminUser) {
            return res.status(400).send('Admin Benutzer nicht gefunden');
        }

        const isMatch = await bcrypt.compare(password, adminUser.password);

        if (!isMatch) {
            return res.status(400).send('Ungültige Anmeldedaten');
        }

        const token = jwt.sign({ id: adminUser._id, email: adminUser.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        console.error('Fehler beim Login:', error);
        res.status(500).send('Serverfehler');
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await AdminUser.find();
        res.status(200).json(users);
    } catch (error) {
        console.error('Fehler beim Abrufen der Benutzer:', error);
        res.status(500).send('Fehler beim Abrufen der Benutzer.');
    }
};

const getUser = async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await AdminUser.findById(userId);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).send('Benutzer nicht gefunden');
        }
    } catch (error) {
        console.error('Fehler beim Abrufen des Benutzers:', error);
        res.status(500).send('Fehler beim Abrufen des Benutzers.');
    }
};

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.get('/users', authMiddleware, getUsers);
router.get('/users/:id', authMiddleware, getUser);

module.exports = router;
