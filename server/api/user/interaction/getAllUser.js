/**
 * @api {get} /api/user/interaction/getAllUser Get all user
 * @apiName GetAllUser
 * @apiGroup User_Interaction
 *
 * @apiSuccess {String} success true
 * @apiSuccess {Object[]} users List of user.
 *
 * @apiError {String} success false
 * @apiError {String} message Error message
 */
const router = require('express').Router();
const User = require('../../../database/model/User');

router.get('/',(req, res) => {
    User.find({}, 'username')
        .then(users=>{
            res.status(200).json({
                success: true,
                users : users
            });
        })
        .catch(err=>{
            res.status(500).json({
                success: false,
                message: err.message
            });
        });
});

module.exports = router;