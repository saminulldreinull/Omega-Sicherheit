const mongoose = require('mongoose');

const adminUserSchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: true, 
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'is invalid'],
        index: true
    },
    password: { 
        type: String, 
        required: true,
        minlength: [6, 'Password must be at least 6 characters long']
    },
    name: { 
        type: String, 
        required: true 
    },
    privacy: { 
        type: Boolean, 
        required: true 
    }
}, { timestamps: true });

const AdminUser = mongoose.model('AdminUser', adminUserSchema);

module.exports = AdminUser;
