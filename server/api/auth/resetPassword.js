/**
 * @api {post} /api/auth/resetPassword Reset Password
 * @apiName ResetPassword
 * @apiGroup Auth
 *
 * @apiBody {String} resetPasswordToken "resetPasswordToken" of the user
 * @apiBody {String} newPassword New password of the user (min. 6 characters)
 *
 * @apiSuccess {Boolean} success true
 * @apiSuccess {String} message Success message
 *
 * @apiError {Boolean} success false
 * @apiError {String} message Error message
 */
const router = require('express').Router();
const User = require('../../database/model/User');

router.post('/', (req, res) => {
    const { resetPasswordToken , newPassword} = req.body;
    if (!resetPasswordToken) {
        return res.status(400).json({
            success: false,
            message: 'Reset password token is required'
        });
    } else if (!newPassword) {
        return res.status(400).json({
            success: false,
            message: 'New password is required'
        });
    } else if (newPassword.length < 6) {
        return res.status(400).json({
            success: false,
            message: 'New password must be at least 6 characters long'
        });
    } else {
        User.findOne({resetPasswordToken : resetPasswordToken})
            .then(user => {
                if (!user) {
                    return res.status(400).json({
                        success: false,
                        message: 'Invalid reset password token'
                    });
                } else {
                    user.changePassword(newPassword)
                        .then(user => {
                            user.resetPasswordToken = null;
                            user.save()
                                .then(() => {
                                    return res.status(200).json({
                                        success: true,
                                        message: 'Password changed successfully'
                                    });
                                })
                                .catch(err => {
                                    console.error(err);
                                    return res.status(500).json({
                                        success: false,
                                        message: 'Internal server error'
                                    });
                                });
                        })
                        .catch(err => {
                            console.error(err);
                            return res.status(500).json({
                                success: false,
                                message: 'Internal server error'
                            });
                        });
                }
            })
            .catch(err => {
                console.error(err);
                return res.status(500).json({
                    success: false,
                    message: 'Internal server error'
                });
            })
    }
});

module.exports = router;