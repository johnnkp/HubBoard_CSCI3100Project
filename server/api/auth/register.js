/**
 * @api {post} /api/auth/register User registration
 * @apiName Register
 * @apiGroup Auth
 *
 * @apiBody {String} username Username (min. 3 characters)
 * @apiBody {String} email Email
 * @apiBody {String} password Password (min. 6 characters)
 *
 * @apiSuccess (202) {Boolean} success True
 * @apiSuccess (202) {String} message Verification email sent
 *
 * @apiError (409) {Boolean} success False
 * @apiError (409) {String} error_attr Attribute that cause error
 * @apiError (409) {String} message Error message
 *
 * @apiError (500) {Boolean} success False
 * @apiError (500) {String} message Internal server error
 */


const router = require('express').Router();
const User = require('../../database/model/User');
const mailer = require('../../lib/mailer');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const validator = require("email-validator");
require('dotenv').config();


router.post('/', (req, res) => {
    const { username, email, password } = req.body;

    // Check if username, email and password is valid
    if (!username) {
        return res.status(409).json({
            success: false,
            error_attr: 'username',
            message: 'Username is required'
        });
    } else if (username.length < 3) {
        return res.status(409).json({
            success: false,
            error_attr: 'username',
            message: 'Username should be of minimum 3 character'
        });
    } else if (!email) {
        return res.status(409).json({
            success: false,
            error_attr: 'email',
            message: 'Email is required'
        });
    } else if (!validator.validate(email)){
        return res.status(409).json({
            success: false,
            error_attr: 'email',
            message: 'Email is not valid'
        });
    } else if (!password) {
        return res.status(409).json({
            success: false,
            error_attr: 'password',
            message: 'Password is required'
        });
    } else if (password.length < 6) {
        return res.status(409).json({
            success: false,
            error_attr: 'password',
            message: 'Password should be of minimum 6 character'
        });
    } else {
        // Check if username or email is used
        User.findOne({$or:[{username: username}, {email: email}]})
            .then(result =>{
                // If username or email is used
                if (result) {
                    if (result.username === username) {
                        res.status(409).json({
                            success: false,
                            error_attr : "username",
                            message: "Username already used"
                        });
                    } else {
                        res.status(409).json({
                            success: false,
                            error_attr : "email",
                            message: "Email already used"
                        });
                    }
                }
                // If username or email is not used
                else {
                    const verificationToken = crypto.randomBytes(20).toString('hex');
                    // Create new user in database
                    User.create({
                        username: username,
                        email: email,
                        password: bcrypt.hashSync(password, Number(process.env.SALT)),
                        verificationToken: verificationToken
                    })
                        .then(() =>{
                            // Send verification email
                            mailer.sendVerificationEmail(email, verificationToken)
                                // If email is sent
                                .then(()=>{
                                    res.status(202).json({
                                        success: true,
                                        message: "Verification email sent"
                                    });
                                })
                                // Catch error when sending verification email
                                .catch(err =>{
                                    console.error(err);
                                    res.status(500).json({
                                        success: false,
                                        message: "Internal server error"
                                    });
                                });
                        })
                        // Catch error when creating user
                        .catch(err =>{
                            console.error(err);
                            res.status(500).json({
                                success: false,
                                message: "Internal server error"
                            });
                        });
                }
            })
            // Catch error when finding user
            .catch(err =>{
                console.error(err);
                res.status(500).json({
                    success: false,
                    message: "Internal server error"
                });
            });
    }
});

module.exports = router;