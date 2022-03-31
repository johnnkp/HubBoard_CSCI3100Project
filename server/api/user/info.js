/**
 * @api {get} /api/user/info Get info of current user
 * @apiName GetUserInfo
 * @apiGroup User
 *
 * @apiSuccess {Boolean} success true
 * @apiSuccess {String} username Username of current user.
 * @apiSuccess {String} email Email of current user.
 *
 * @apiError {Boolean} success false
 * @apiError {String} error Error message.
 */

const router = require('express').Router();

router.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        username: req.user.username,
        email: req.user.email
    });
});

module.exports = router;