/**
 * @api {post} /api/user/todolist/contributor/contributorRequest Contributor Request
 * @apiName ContributorRequest
 * @apiGroup User_Todolist_Contributor
 *
 * @apiBody {String} targetUsername Username of the target user
 * @apiBody {String} todolistId Id of the todolist
 *
 * @apiSuccess {Boolean} success true
 * @apiSuccess {String} message Success message
 *
 * @apiError {Boolean} success false
 * @apiError {String} message Error message
 */


const router = require('express').Router();
const Todolist = require('../../../../database/model/Todolist');
const ContributorRequest = require('../../../../database/model/Todolist/ContributorRequest');
const User = require('../../../../database/model/User');
const { ContributorRequestNotification } = require('../../../../database/model/Notification');
const { emitNotification } = require('../../../../socket');


router.post('/',(req,res)=>{
    const { targetUsername, todolistId } = req.body;
    // Check if targetUsername and todolistId are provided
    if (!targetUsername || !todolistId) {
        return res.status(400).json({
            success: false,
            message: 'targetUsername and todolistId are required'
        });
    }
    // Check if target user is current user
    else if (targetUsername === req.user.username){
        return res.status(400).json({
            success: false,
            message: 'You cannot invite yourself'
        });
    }
    // Find todolist by todolistId
    Todolist.findById(todolistId)
        .then(todolist => {
            // If todolist is not found
            if (!todolist) {
                return res.status(404).json({
                    success: false,
                    message: 'TodoList not found'
                });
            }
            // If current user is not the owner of the todolist
            if (!todolist.isOwner(req.user.id)) {
                return res.status(403).json({
                    success: false,
                    message: 'You are not the owner of this todolist'
                });
            }
            // Find target user by targetUsername
            User.findOne({
                username: targetUsername
            })
                .then(targetUser=>{
                    // If target user is not found
                    if (!targetUser) {
                        return res.status(404).json({
                            success: false,
                            message: 'Target user not found'
                        });
                    }
                    // If target user is already a contributor
                    if (todolist.isContributor(targetUser.id)){
                        return res.status(400).json({
                            success: false,
                            message: 'Target user is already a contributor'
                        });
                    }
                    // Send contributor request to target user:
                    // Check whether the ContributorRequest exists
                    ContributorRequest.findOne({
                        todolist : todolist._id,
                        fromUser : req.user.id,
                        toUser : targetUser._id
                    })
                        .then(contributorRequest =>{
                            (new Promise((resolve,reject)=>{
                                // If contributorRequest exists
                                if (contributorRequest){
                                    ContributorRequestNotification.findOneAndUpdate({
                                        content: contributorRequest._id
                                    },{
                                        time: Date.now()
                                    })
                                        .then(resolve)
                                        .catch(reject);
                                }
                                // If ContributorRequest does not exist
                                else {
                                    // Create contributorRequest
                                    ContributorRequest.create({
                                        todolist : todolist._id,
                                        fromUser : req.user.id,
                                        toUser : targetUser._id
                                    })
                                        .then(contributorRequest =>{
                                            // Create new contributorRequestNotification
                                            (new ContributorRequestNotification({
                                                owner: targetUser._id,
                                                content: contributorRequest._id,
                                                time: Date.now()
                                            })).save()
                                                .then(notification =>{
                                                    // push notification to target user's notification list
                                                    targetUser.notifications.push(notification._id);
                                                    targetUser.save()
                                                        .then(resolve)
                                                        .catch(reject);
                                                })
                                                .catch(reject);
                                        })
                                        .catch(reject);
                                }
                            }))
                                .then (()=>{
                                    // emit notification to target user
                                    emitNotification(targetUser._id);
                                    return res.status(200).json({
                                        success: true,
                                        message: 'Contributor request sent'
                                    });
                                })
                                .catch(err=>{
                                    return res.status(500).json({
                                        success: false,
                                        message: err.message
                                    });
                                });
                        })
                        .catch(err=>{
                            return res.status(500).json({
                                success: false,
                                message: err.message
                            });
                        })
                })
                .catch(err=>{
                    return res.status(500).json({
                        success: false,
                        message: err.message
                    });
                });
        })
        .catch(err => {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        });
})

module.exports = router;
