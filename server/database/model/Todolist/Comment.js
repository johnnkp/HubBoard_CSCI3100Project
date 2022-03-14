const mongoose = require('mongoose');

// Define the Comment schema
const CommentSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
});


module.exports = mongoose.model('Comment', CommentSchema);