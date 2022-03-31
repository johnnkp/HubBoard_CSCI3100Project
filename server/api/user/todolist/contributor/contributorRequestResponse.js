/**
 * @api {post} /api/user/todolist/contributor/contributorRequestResponse Response to contributor request
 * @apiName contributorRequestResponse
 * @apiGroup User_Todolist_Contributor
 *
 * @apiBody {String} requestId id of the contributor request
 * @apiBody {Boolean} isAccepted accept or not
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
const { ContributorRequestNotification, ContributorRequestResponseNotification} = require('../../../../database/model/Notification');
const { emitNotification } = require('../../../../socket');

router.post('/',(req,res)=>{
    const {requestId, isAccepted} = req.body;
    if (!requestId || isAccepted === undefined) {
        return res.status(400).json({
            success: false,
            message: "requestId and isAccepted are required"
        });
    }
    ContributorRequest.findById(requestId)
        .then(contributorRequest=>{
            if (!contributorRequest) {
                return res.status(404).json({
                    success: false,
                    message: "Contributor request not found"
                });
            }
            else if (!contributorRequest.toUser.equals(req.user._id)){
                return res.status(403).json({
                    success: false,
                    message: "You are not allowed to accept this request"
                });
            }
            else {
                (new Promise((resolve,reject)=>{
                    if (isAccepted){
                        Todolist.findById(contributorRequest.todolist)
                            .then(todolist=>{
                                if (!todolist) {
                                    reject("Todolist not found");
                                }
                                else {
                                    todolist.contributors.push(req.user._id);
                                    req.user.todolists.push(todolist._id);
                                    Promise.all([todolist.save(),req.user.save()])
                                        .then(()=>{
                                            resolve();
                                        })
                                        .catch(err=>{
                                            reject(err);
                                        });
                                }
                            })
                            .catch(err=>{
                                reject(err);
                            });
                    }
                    else {
                        resolve();
                    }
                }))
                    .then(()=>{
                        const responseToFromUser = new Promise((resolve,reject)=>{
                            ContributorRequestResponseNotification.create({
                                owner : contributorRequest.fromUser,
                                content :{
                                    fromUser : req.user._id,
                                    isAccepted : isAccepted,
                                }
                            })
                                .then(notification=>{
                                    User.findById(contributorRequest.fromUser)
                                        .then(user=>{
                                            if (!user) {
                                                reject("target user not found");
                                            }
                                            else {
                                                user.notifications.push(notification);
                                                user.save()
                                                    .then(()=>{
                                                        emitNotification(user._id);
                                                        resolve();
                                                    })
                                                    .catch(err=>{
                                                        reject(err);
                                                    });
                                            }
                                        })
                                        .catch(err=>{
                                            reject(err);
                                        });
                                })
                                .catch(err=>{
                                    reject(err);
                                });

                        });
                        const removeResponse = new Promise((resolve,reject)=>{
                            ContributorRequestNotification.findOne({
                                content: contributorRequest._id,
                            })
                                .then((notification)=>{
                                    if (notification) {
                                        req.user.notifications.pull(notification._id);
                                        Promise.all([notification.remove(), req.user.save()])
                                            .then(resolve)
                                            .catch(reject);
                                    }
                                })
                                .catch(reject);
                        });
                        Promise.all([responseToFromUser,removeResponse])
                            .then(()=>{
                                contributorRequest.remove()
                                    .then(()=>{
                                        return res.status(200).json({
                                            success: true,
                                            message: "Response sent successfully",
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
                    .catch(err=>{
                        return res.status(500).json({
                            success: false,
                            message: err.message
                        });
                    });
            }
        })
        .catch(err=>{
            return res.status(500).json({
                success: false,
                message: err.message
            });
        });
});
module.exports = router;