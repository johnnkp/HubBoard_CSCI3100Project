/**
 * @api {put} /api/user/passwordModify Modify password
 * @apiName ModifyPassword
 * @apiGroup User
 *
 * @apiBody {String} oldPassword Old password
 * @apiBody {String} newPassword New password (min. 6 characters)
 *
 * @apiSuccess {Boolean} success True
 * @apiSuccess {String} message Success message
 *
 * @apiError {Boolean} success False
 * @apiError {String} message Error message
 */

const router = require('express').Router();
const User = require('../../database/model/User')
const bcrypt = require('bcryptjs')
require("dotenv").config();

router.put('/',(req,res)=>{
    const {oldPassword,newPassword} = req.body;
    if (!oldPassword) {
        return res.status(400).json({
            success: false,
            message: 'Old password is required'
        })
    } else if (!newPassword) {
        return res.status(400).json({
            success: false,
            message: 'New password is required'
        })
    } else if (newPassword.length < 6) {
        return res.status(400).json({
            success: false,
            message: 'New password must be at least 6 characters long'
        })
    }
    User.findOne({_id:req.user._id})
        .then(user=> {
            if (!user) {
                res.status(404).json({
                    success: false,
                    message: "User not found"
                })
            } else if (bcrypt.compareSync(oldPassword, user.password)) {
                user.changePassword(newPassword)
                    .then(() => {
                        res.status(200).json({
                            success: true,
                            message: 'Password changed successfully'
                        })
                    })
                    .catch(err => {
                        console.error(err);
                        res.status(500).json({
                            success: false,
                            message: 'Internal server error'
                        })
                    })
            } else {
                res.status(400).json({
                    success: false,
                    message: 'Wrong password'
                })
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        })
})

module.exports = router;