/**
 * @api {post} /api/auth/resetPasswordEmail Send Reset Password Email
 * @apiName ResetPasswordEmail
 * @apiGroup Auth
 *
 * @apiBody {String} email Email address of the user to reset the password.
 *
 * @apiSuccess {Boolean} success True if the email was sent successfully.
 * @apiSuccess {String} message Success message.
 *
 * @apiError {Boolean} success False if the email was not sent successfully.
 * @apiError {String} message Error message.
 *
 */


const crypto = require("crypto");
const router = require('express').Router();
const User = require('../../database/model/User');
const mailer = require("../../lib/mailer");

router.post('/', (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({
            success: false,
            message: "Email is required"
        });
    }
    User.findOne({email:email})
        .then(user => {
            if(!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            } else {
                const resetPasswordToken = crypto.randomBytes(20).toString('hex');
                user.resetPasswordToken = resetPasswordToken;
                user.save()
                    .then(()=>{
                        mailer.sendPasswordResetEmail(email, resetPasswordToken)
                            .then(()=>{
                                res.status(200).json({
                                    success: true,
                                    message: "Email sent"
                                });
                            })
                            .catch(err => {
                                console.log(err)
                                res.status(500).json({
                                    success: false,
                                    message: "Error sending email"
                                });
                            });
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(500).json({
                            success: false,
                            message: "Error saving token"
                        });
                    });
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                success: false,
                message: "Error finding user"
            });
        });
});

module.exports = router;