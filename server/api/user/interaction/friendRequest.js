/**
 * @api {post} /api/user/interaction/friendRequest Friend request
 * @apiName Friend Request
 * @apiGroup User Interaction
 * @apiDescription Send a friend request to target user.
 *
 * @apiBody {String} targetUsername The username of target user.
 *
 * @apiSuccess {Boolean} success True.
 * @apiSuccess {String} message Success message
 *
 * @apiError {Boolean} success False.
 * @apiError {String} message Error message
 */

const router = require('express').Router();
const User = require('../../../database/model/User');
const FriendRequest = require('../../../database/model/FriendRequest');
const { FriendRequestNotification } = require('../../../database/model/Notification');
const { emitNotification } = require('../../../socket');


router.post('/',(req,res)=>{
    const { targetUsername } = req.body;
    // If the target user is not defined
    if (!targetUsername) {
        return res.status(400).json({
            success: false,
            message: 'Missing targetUsername'
        });
    }
    // If target user is the request user
    else if (req.user.username == targetUsername) {
        return res.status(400).json({
            success: false,
            message: 'Cannot send friend request to yourself'
        });
    }
    // Find the target user
    User.findOne({username:targetUsername},'_id username friendRequestsReceived notifications')
        .then(targetUser=>{
            // If the target user is not found
            if (!targetUser) {
                return res.status(404).json({
                    success: false,
                    message: 'Target user not found'
                });
            }
            // If target user is already friend
            else if (req.user.friends.includes(targetUser._id)) {
                return res.status(400).json({
                    success: false,
                    message: 'You are already friends with this user'
                });
            } else {
                // Check friend request already exist
                FriendRequest.findOne({
                    fromUser: req.user._id,
                    toUser: targetUser._id
                })
                    .then(request=>{
                        // If the request is already exist
                        if (request) {
                            // Update the time of the notification
                            FriendRequestNotification.findOne({
                                content:request._id.toString(),
                            })
                                .then(friendRequestNotification=>{
                                    friendRequestNotification.time = Date.now();
                                    friendRequestNotification.save()
                                        .then(()=>{
                                            // Emit the notification to the target user
                                            emitNotification(targetUser._id);
                                            return res.status(200).json({
                                                success: true,
                                                message: 'Friend request Notification time updated'
                                            });
                                        })
                                        .catch(err=>{
                                            console.error(err);
                                            return res.status(500).json({
                                                success: false,
                                                message: 'Internal server error'
                                            });
                                        });
                                })
                                .catch(err=>{
                                    console.error(err);
                                    return res.status(500).json({
                                        success: false,
                                        message: 'Internal server error'
                                    });
                                });
                        } else {
                            // Create a new friend request
                            FriendRequest.create({
                                fromUser: req.user._id,
                                toUser: targetUser._id,
                            })
                                .then(friendRequest=>{
                                    // Create a notification for the target user
                                    FriendRequestNotification.create({
                                        owner: targetUser._id,
                                        time: Date.now(),
                                        content: friendRequest._id
                                    })
                                        .then(notification=>{
                                            // Push the notification to targetUser's notifications
                                            targetUser.notifications.push(notification._id);
                                            targetUser.save()
                                                .then(()=>{
                                                    // Emit the notification to the target user
                                                    emitNotification(targetUser._id);
                                                    return res.status(200).json({
                                                        success: true,
                                                        message: 'Friend request sent'
                                                    });
                                                })
                                                .catch(error=>{
                                                    console.error(error);
                                                    return res.status(500).json({
                                                        success: false,
                                                        message: 'Internal server error'
                                                    });
                                                });
                                        })
                                        .catch(error=>{
                                            console.error(error);
                                            return res.status(500).json({
                                                success: false,
                                                message: 'Internal server error'
                                            });
                                        });
                                })
                                .catch(err=>{
                                    console.error(err);
                                    return res.status(500).json({
                                        success: false,
                                        message: 'Internal server error'
                                    });
                                });
                        }
                    })
            }
        })
})

module.exports = router;