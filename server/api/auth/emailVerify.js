/**
 * @api {get} /api/auth/emailVerify/:token Email verification
 *
 * @apiName Email verification
 * @apiGroup Auth
 *
 * @apiParam {String} token Token for verifying email
 *
 * @apiSuccess {Boolean} success true
 * @apiSuccess {String} message Success message
 *
 * @apiError (500) {Boolean} success false
 * @apiError (500) {String} message Internal server error
 *
 * @apiError (404) {Boolean} success false
 * @apiError (404) {String} message Email verification token not found
 *
 * @apiError (400) {Boolean} success false
 * @apiError (400) {String} message Email verification token not provided
 */

const Router = require('express').Router();
const User = require('../../database/model/User');

Router.get('/:token', (req, res) => {
    if (req.params['token']) {
        const token = req.params['token'];
        User.findOne({
            verificationToken: token
        })
            .then(result=>{
                if (result) {
                    result.isEmailVerified = true;
                    result.verificationToken = null;
                    result.save()
                        .then(()=>{
                            res.status(200).json({
                                success: true,
                                message: 'Email verified successfully'
                            });
                        })
                        .catch(err=>{
                            console.error(err)
                            res.status(500).json({
                                success: false,
                                message: 'Internal Server Error'
                            });
                        });
                } else {
                    res.status(404).json({
                        success: false,
                        message: 'Email verification token not found'
                    });
                }
            })
    }
    else {
        res.status(400).json({
            success: false,
            message: 'Email verification token not provided'
        });
    }
});

module.exports = Router;