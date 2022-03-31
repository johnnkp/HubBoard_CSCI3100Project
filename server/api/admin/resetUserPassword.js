/**
 * @api {put} /api/admin/resetUserPassword Reset User Password
 * @apiName ResetUserPassword
 * @apiGroup Admin
 *
 * @apiBody {String} username Username of the user to reset password
 * @apiBody {String} password New password to set
 *
 * @apiSuccess {Boolean} success true
 * @apiSuccess {String} message Success message
 *
 * @apiError {Boolean} success false
 * @apiError {String} message Error message
 */

const router = require('express').Router();
const User = require('../../database/model/User');


router.put('/',(req,res)=>{
    const {username,newPassword} = req.body;
    if (!username || !newPassword) {
        return res.status(400).json({
            success: false,
            message: 'Please provide username and newPassword'
        });
    }
    // Find user by username
    User.findOne({username:username},(err,user)=>{
        if(err){
            console.error(err);
            res.status(500).json({
                success:false,
                message:err.message
            })
        }else if(!user){
            res.status(404).json({
                success:false,
                message:'User not found'
            })
        }
        // Reset password of user
        else{
            user.changePassword(newPassword)
                .then(()=>{
                    res.status(200).json({
                        success:true,
                        message:'Password changed successfully'
                    })
                })
                .catch(err=>{
                    console.error(err);
                    res.status(500).json({
                        success:false,
                        message:err.message
                    })
                })
        }
    })
})

module.exports = router;