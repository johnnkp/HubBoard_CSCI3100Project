const MongoStore = require("connect-mongo");
const session = require("express-session");
require('dotenv').config();

module.exports.init = (app)=>{
    app.use(module.exports.sessionMiddleware);
}

module.exports.sessionMiddleware = session({
    secret : process.env.SESSION_SECRET,
    resave : false,
    saveUninitialized : false,
    cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    },
    // Store session in database:
    store : MongoStore.create({
        mongoUrl : process.env.MONGODB_URI,
        dbName : "HubBoard",
        collectionName : 'sessions'
    })
})