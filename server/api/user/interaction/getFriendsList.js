/**
 * @api {get} /api/user/interaction/getFriendsList Get friends list
 * @apiName GetFriendsList
 * @apiGroup User Interaction
 *
 * @apiSuccess {Boolean} success True
 * @apiSuccess {Object[]} friends List of friends with username
 *
 * @apiError {Boolean} success False
 * @apiError {String} message Error message
 */
const router = require('express').Router();

router.get('/',(req,res)=>{
    req.user.populate({
        path: 'friends',
        select: 'username'
    })
        .then(()=>{
            res.status(200).json({
                success:true,
                friends:req.user.friends
            });
        })
        .catch(error=>{
            console.log(error)
            res.status(500).json({
                success:false,
                message:"Internal server error"
            });
        });
});


module.exports = router