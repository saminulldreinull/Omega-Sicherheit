// src/models/adminUser.js
const mongoose = require('mongoose');

const adminUserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    privacy: { type: Boolean, required: true }
});

const AdminUser = mongoose.model('AdminUser', adminUserSchema);

module.exports = AdminUser;
