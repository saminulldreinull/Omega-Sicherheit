const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const AdminUser = require('../models/adminUser');

// Admin Login
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

// Admin Registrierung
const registerAdmin = async (req, res) => {
  const { email, password, name, privacy } = req.body;

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

// Alle Benutzer abrufen
const getUsers = async (req, res) => {
  try {
    const users = await AdminUser.find();
    res.status(200).json(users);
  } catch (error) {
    console.error('Fehler beim Abrufen der Benutzer:', error);
    res.status(500).send('Fehler beim Abrufen der Benutzer.');
  }
};

// Benutzer nach ID abrufen
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

module.exports = {
  loginAdmin,
  registerAdmin,
  getUsers,
  getUser
};
