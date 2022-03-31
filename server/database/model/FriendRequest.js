const mongoose = require('mongoose');


// Define the FriendRequest schema
const FriendRequestSchema = new mongoose.Schema({
    fromUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    toUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
})


module.exports = mongoose.model('FriendRequest', FriendRequestSchema);