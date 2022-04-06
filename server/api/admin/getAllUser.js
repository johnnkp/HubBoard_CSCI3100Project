/**
 * @api {get} /api/admin/getAllUser Get all user data
 * @apiName GetAllUser
 * @apiGroup Admin
 *
 * @apiSuccess {Boolean} success True.
 * @apiSuccess {Object} users User data.
 *
 * @apiError {Boolean} success False.
 * @apiError {String} message Error message.
 */

const router = require('express').Router();
const User = require('../../database/model/User');

router.get('/', (req, res) => {
    User.find({},'_id username email') //specify fields to return
        .then(users=>{
            res.status(200).json({
                success: true,
                users: users
            })
        })
        .catch(err=>{
            console.error(err);
            res.status(500).json({
                success: false,
                message: "Internal server error"
            })
        })
});

module.exports = router;