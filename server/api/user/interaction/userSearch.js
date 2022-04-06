/**
 * @api {get} /user/search/:keyword Search for users
 * @apiName SearchUsers
 * @apiGroup User_Interaction
 *
 * @apiParam {String} keyword The keyword to search for
 *
 * @apiSuccess {Boolean} success true
 * @apiSuccess {Object[]} users The users that match the keyword, including their _id and username
 *
 * @apiError {Boolean} success false
 * @apiError {String} message The error message
 */

const router = require('express').Router();
const User = require('../../../database/model/User');


router.get('/:keyword',(req,res)=>{
    User.find({
        username:{$regex:req.params.keyword,$options:'i'}
    },'username')
        .then(users=>{
            res.status(200).json({
                success:true,
                users: users
            });
        })
        .catch(err=>{
            res.status(500).json({
                success:false,
                message:err.message
            });
        })
})

module.exports = router;