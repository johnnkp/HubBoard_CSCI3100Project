/**
 * @api {post} /api/user/authVerify Verify if user is authenticated
 * @apiName AuthVerify
 * @apiGroup User
 *
 * @apiSuccess {Boolean} success true if user is authenticated
 * @apiSuccess {String} message message
 *
 * @apiError {Boolean} success false if user is not authenticated
 * @apiError {String} message message
 */

const router = require('express').Router();

router.post('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'User is authenticated'
    });
});

module.exports = router;