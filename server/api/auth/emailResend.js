/**
 * @api {post} /api/auth/emailResend Resend verification email
 * @apiName ResendEmail
 * @apiGroup Auth
 *
 * @apiBody {String} email Email address to resend a verification email.
 *
 * @apiSuccess {Boolean} success True.
 * @apiSuccess {String} message Success message.
 *
 * @apiError {Boolean} success false.
 * @apiError {String} message Error message.
 */

const router = require('express').Router();
const User = require('../../database/model/User');
const crypto = require("crypto");
const mailer = require("../../lib/mailer");


router.post('/',(req,res)=>{
    const email = req.body.email;
    if (!email) {
        return res.status(400).json({
            success: false,
            message: "Email is required"
        });
    }
    // Check if email is valid
    User.findOne({email: email})
        .then(user=>{
            if(!user){
                res.status(404).json({
                    success:false,
                    message:'Email not registered'
                })
            } else if (user.isEmailVerified){
                res.status(406).json({
                    success:false,
                    message:'Email already verified'
                })
            } else {
                // Generate a random token
                const verificationToken = crypto.randomBytes(20).toString('hex');
                user.verificationToken = verificationToken;
                user.save()
                    .then(()=>{
                        // Send verification email
                        mailer.sendVerificationEmail(email, verificationToken)
                            .then(()=>{
                                res.status(200).json({
                                    success:true,
                                    message:'Verification email sent'
                                })
                            })
                            .catch(err=>{
                                console.error(err);
                                res.status(500).json({
                                    success:false,
                                    message:'Internal server error'
                                })
                            })
                    })
                    .catch(err=>{
                        console.error(err);
                        res.status(500).json({
                            success:false,
                            message:'Internal server error'
                        })
                    })
            }
        })
});

module.exports = router;