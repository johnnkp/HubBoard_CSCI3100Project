/**
 * @api {post} /api/user/interaction/unfriend Unfriend
 * @apiName Unfriend
 * @apiGroup User Interaction
 *
 * @apiBody {String} targetUsername The username of the user to unfriend.
 *
 * @apiSuccess {Boolean} success True.
 * @apiSuccess {String} message The message to display to the user.
 *
 * @apiError {Boolean} success False.
 * @apiError {String} message The error message.
 */

const router = require('express').Router();
const User = require('../../../database/model/User');

router.post('/',(req,res)=>{
    const {targetUsername} = req.body;
    // Check if the target user empty
    if (!targetUsername) {
        return res.status(400).json({
            success: false,
            message: 'Missing targetUsername'
        });
    }
    // Find the target user
    User.findOne({username:targetUsername})
        .then(targetUser=>{
            // If the target user not found
            if (!targetUser) {
                return res.status(400).json({
                    success: false,
                    message: 'Target user not found'
                });
            }
            // If target is friend
            else if (req.user.friends.includes(targetUser._id)) {
                req.user.friends.pull(targetUser._id);
                targetUser.friends.pull(req.user._id);
                Promise.all([req.user.save(),targetUser.save()])
                    .then(()=>{
                        return res.status(200).json({
                            success: true,
                            message: 'Successfully unfriended'
                        });
                    })
                    .catch(err=>{
                        return res.status(500).json({
                            success: false,
                            message: err
                        });
                    });
            }
            // If target is not friend
            else {
                return res.status(409).json({
                    success: false,
                    message: 'Target user is not your friend'
                });
            }
        })
})

module.exports = router