/**
 * @api {post} /api/admin/adminVerify Verify if user is admin
 * @apiName adminVerify
 * @apiGroup Admin
 *
 * @apiSuccess {Boolean} success true if user is admin
 * @apiSuccess {String} message message
 *
 * @apiError {Boolean} success false if user is not admin
 * @apiError {String} message message
 */

const router = require('express').Router();

router.post('/',(req,res)=>{
    res.status(200).json({
        success: true,
        message: 'Admin Verified'
    })
})

module.exports = router;