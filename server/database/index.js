require('dotenv').config()
const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI;

// Connect to the database
module.exports = {
    connect: () => {
        mongoose.connect(MONGODB_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: "HubBoard"
        });
        mongoose.connection.on('connected', () => {
            console.log('Connected to MongoDB')
        });
        mongoose.connection.on('error', (err) => {
            console.log('Error connecting to MongoDB: ' + err)
        });
    }
}

