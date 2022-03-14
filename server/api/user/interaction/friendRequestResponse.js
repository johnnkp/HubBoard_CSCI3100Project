/**
 * @api {post} /api/user/interaction/friendRequestResponse Friend Request Response
 * @apiName Friend Request Response
 * @apiGroup User Interaction
 *
 * @apiBody {String} requestId The id of the friend request.
 * @apiBody {Boolean} isAccepted If the request is accepted.
 *
 * @apiSuccess {Boolean} success True.
 * @apiSuccess {String} message Success message.
 *
 * @apiError {Boolean} success False.
 * @apiError {String} message The error message.
 */

const router = require('express').Router();
const friendRequest = require('../../../database/model/FriendRequest');

router.post('/',(req,res)=>{
    const {requestId,isAccepted} = req.body;
    // Check for validity of requestId and isAccepted
    if (!requestId || isAccepted === undefined){
        return res.status(400).json({
            success:false,
            message:'requestId or isAccepted is missing'
        });
    }
    // Find the request by requestId
    friendRequest.findOne({_id:requestId})
        .then(request=>{
            // Check if request exists
            if (!request){
                return res.status(400).json({
                    success:false,
                    message:'request not found'
                });
            }
            // Check if user is the receiver of the request
            else if (req.user._id.toString() !== request.toUser.toString()){
                return res.status(400).json({
                    success:false,
                    message:'User is not the receiver of the request'
                });
            }
            else {
                request.populate('fromUser toUser')
                    .then(()=>{
                        const {fromUser, toUser} = request;
                        // Pull the request from the friendRequest array and remove the request from database
                        fromUser.friendRequestsSent.pull(requestId)
                        toUser.friendRequestsReceived.pull(requestId)
                        Promise.all([fromUser.save(),toUser.save,request.remove()])
                            .then(()=>{
                                // If isAccepted, add the user to the friend array of the other user
                                if (isAccepted){
                                    fromUser.friends.push(toUser._id);
                                    toUser.friends.push(fromUser._id);
                                    Promise.all([fromUser.save(),toUser.save()])
                                        .then(()=>{
                                            return res.status(200).json({
                                                success:true,
                                                message:'friend request accepted'
                                            });
                                        })
                                        .catch(err=>{
                                            return res.status(500).json({
                                                success:false,
                                                message:'error while accepting friend request',
                                                error:err
                                            });
                                        });
                                }
                                // If not isAccepted, do nothing
                                else {
                                    return res.status(200).json({
                                        success:true,
                                        message:'friend request rejected'
                                    });
                                }
                            })
                            .catch(err=>{
                                return res.status(500).json({
                                    success:false,
                                    message:'error while accepting friend request',
                                    error:err
                                });
                            });
                    })
                    .catch(err=>{
                        console.log(err);
                        return res.status(500).json({
                            success:false,
                            message:'error in populating request'
                        });
                    });


            }
        })

})

module.exports = router;