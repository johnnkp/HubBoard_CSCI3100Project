const mongoose = require('mongoose');
const option = { discriminatorKey: 'kind' };
// Define the Notification schema
const NotificationSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    time: {
        type: Date,
        default: Date.now
    },
})

const Notification = mongoose.model('Notification', NotificationSchema);

module.exports = Notification;


// Inheritance FriendRequestNotification from Notification
const FriendRequestNotification = Notification.discriminator('FriendRequestNotification', new mongoose.Schema({
    content :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FriendRequest',
        required: true
    }
}, option));

// Inheritance FriendRequestAcceptedNotification from Notification
const FriendRequestResponseNotification = Notification.discriminator('FriendRequestResponseNotification', new mongoose.Schema({
    content : {
        fromUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        isAccepted: Boolean
    }
}, option));

// Inheritance FriendRequestAcceptedNotification from Notification
const ContributorRequestNotification = Notification.discriminator('ContributorRequestNotification', new mongoose.Schema({
    content :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ContributorRequest',
        required: true
    }
}, option));

// Inheritance FriendRequestAcceptedNotification from Notification
const ContributorRequestResponseNotification = Notification.discriminator('ContributorRequestResponseNotification', new mongoose.Schema({
    content : {
        fromUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        isAccepted: Boolean
    }
}, option));

module.exports = {
    FriendRequestNotification,
    FriendRequestResponseNotification,
    ContributorRequestNotification,
    ContributorRequestResponseNotification
}