const express = require('express')
const app = express()
const server = require('http').createServer(app)
const socket = require('./server/socket')
const database = require('./server/database')
const passport = require('./server/lib/passport')
const session = require('./server/lib/session')

require('dotenv').config()

// Connect to database
database.connect()
// Session initialization
session.init(app)
// Passport initialization
passport.init(app)

// Api routing
app.use('/api', require('./server/api'))

// Socket.io
socket.init(server)

const PORT = process.env.PORT || 3001
server.listen(PORT);
console.log("Server is listening to port", PORT)

