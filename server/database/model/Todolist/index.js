const mongoose = require('mongoose');

// Define the Todolist schema
const TodolistSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: String,
    checkboxes: [{
        isChecked: {
            type: Boolean,
            default: false
        },
        content: String
    }],
    isActive: {
        type: Boolean,
        default: true
    },
    createTime : {
        type: Date,
        default: Date.now
    },
    lastUpdateTime : {
        type: Date,
        default: Date.now
    },
    contributors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
})

// Update the lastUpdateTime before the Todolist is saved
TodolistSchema.pre('save', function(next) {
    this.lastUpdateTime = Date.now();
    next();
});

// Check if user is the owner of the Todolist
TodolistSchema.methods.isOwner = function(userId){
    return this.owner.equals(userId);
}

// Check if user is a contributor of the Todolist
TodolistSchema.methods.isContributor = function(userId){
    return this.contributors.some(contributor=>contributor.toString() === userId.toString());
}

// Check if user is the owner or a contributor of the Todolist
TodolistSchema.methods.isOwnerOrContributor = function(userId){
    return this.owner.equals(userId) || this.contributors.some(contributor=>contributor.toString() === userId.toString());
}

module.exports = mongoose.model('Todolist', TodolistSchema);