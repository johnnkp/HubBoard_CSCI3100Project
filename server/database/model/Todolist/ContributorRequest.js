const mongoose = require('mongoose');


// Define the ContributorRequest schema
const ContributorRequestSchema = new mongoose.Schema({
    todolist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Todolist',
        required: true
    },
    fromUser:{
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


module.exports = mongoose.model('ContributorRequest', ContributorRequestSchema);