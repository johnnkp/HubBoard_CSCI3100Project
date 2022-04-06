const mongoose = require('mongoose');

// Define the PrivateMassageSchema schema
const PrivateMassageSchema = new mongoose.Schema({
    user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    messages: [{
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        content: {
            type: String,
            required: true
        },
    }]
});


module.exports = mongoose.model('PrivateMassage', PrivateMassageSchema);