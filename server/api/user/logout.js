/**
 * @api {post} /api/user/logout Logout
 * @apiName Logout
 * @apiGroup User
 *
 * @apiSuccess {Boolean} success true.
 * @apiSuccess {String} message Success message
 *
 * @apiError {Boolean} success false.
 * @apiError {String} message Error message.
 */

const router = require('express').Router();

router.post('/',(req, res) => {
    req.logout();
    res.json({
        success: true,
        message: 'Logged out successfully'
    });
});

module.exports = router;