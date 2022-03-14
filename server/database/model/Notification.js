const mongoose = require('mongoose');

// Define the Notification schema
const NotificationSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
})

const Notification = mongoose.model('Notification', NotificationSchema);

module.exports = Notification;

const option = { discriminatorKey: 'kind' };

const FriendRequestNotification = Notification.discriminator('FriendRequestNotification', new mongoose.Schema({
    content :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FriendRequest',
        required: true
    }
}, option));

module.exports = {
    FriendRequestNotification,
}