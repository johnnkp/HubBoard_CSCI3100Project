const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

// Define the User schema
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required : true,
        unique : true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    verificationToken: String,
    resetPasswordToken: String,
    profilePhoto: {
        buffer: Buffer,
        contentType: String
    },
    googleId: String,
    todolists: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Todolist'
    }],
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    notifications : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Notification'
    }],
    privateMessages : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PrivateMessage'
    }]
})

UserSchema.methods.changePassword = function(newPassword) {
    // Store the hashed new password in the database
    this.password = bcrypt.hashSync(newPassword, Number(process.env.SALT));
    return this.save();
}

module.exports = mongoose.model('User', UserSchema);