const {sessionMiddleware} = require('../lib/session');
const passport = require('passport');
const User = require('../database/model/User');
let io;

const notificationPopulateOption = {
    path: 'notifications',
    populate: {
        path: 'content',
        select: 'fromUser time',
        populate: {
            path: 'fromUser',
            select: 'username'
        }
    }
}

/**
 * @api {socket} notifications Notifications of user
 * @apiName notifications
 * @apiGroup Socket
 * @apiDescription This socket is used to get notifications of user
 *
 * @apiExample {js} Example usage:
 * ws.on('notifications', (notifications) => {
 *      // Do something
 * })
 *
 * @apiSuccessExample {js} Example return:
 * // Array of notifications
 * [
 *     {
 *         "_id": "62289d1c7f3f8b9b913c7672", // Notification id
 *         "content": { // Notification content
 *             "_id": "62289d1c7f3f8b9b913c7670",
 *             "fromUser": {
 *                 "_id": "621f6f49849ea9671627004e",
 *                 "username": "user"
 *             },
 *             "time": "2022-03-09T12:49:41.321Z"
 *         },
 *         "owner": "621f6f49849ea9671627004e",
 *         "__t": "FriendRequestNotification", // Notification type
 *         "__v": 0
 *     }
 * ]
 *
 */
module.exports.init = (server)=>{
    io = require('socket.io')(server);
    // wrap connect middleware to socket.io middleware
    const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
    io.use(wrap(sessionMiddleware));
    io.use(wrap(passport.initialize()));
    io.use(wrap(passport.session()));

    // ensure user is authenticated before allowing socket connection
    io.use((socket, next)=>{
        if (socket.request.user)
            next();
        else
            next(new Error('Unauthenticated'));
    });

    io.on('connection', (socket)=>{
        const user = socket.request.user;
        const UserId = user._id.toString();
        // Using user id as socket room id
        console.log(UserId)
        socket.join(UserId);
        console.log(socket.rooms)
        socket.on('disconnect', ()=>{
            socket.leave(UserId);
        });
        // emit notifications when user when connected
        user.populate(notificationPopulateOption)
            .then(user=>{
                io.to(UserId).emit('notifications', user.notifications);
            });

        socket.on('test', (msg)=>{
            console.log('test: ' + msg);
            io.emit('test', msg);
        });
    });
};

module.exports.emitNotification = (userId)=>{
    // Find user's notifications
    User.findOne({_id: userId},'notifications')
        .then(user=>{
            if (user)
                user.populate(notificationPopulateOption)
                    .then(user=>{
                        // Emit notifications
                        io.to(userId.toString()).emit('notifications', user.notifications);
                    });
        })
};