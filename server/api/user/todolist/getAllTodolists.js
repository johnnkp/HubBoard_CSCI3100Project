/**
 * @api {get} /api/user/todolist/getAllTodolists Get all todolists of current user
 * @apiName GetAllTodolists
 * @apiGroup User_Todolist
 *
 * @apiSuccess success true
 * @apiSuccess {Object[]} todolists List of all todolists.
 *
 * @apiError success false
 * @apiError message Error message
 */

const router = require('express').Router();

router.get('/', (req, res) => {
    // Get all todolists of current user
    req.user.populate('todolists')
        .then(()=>{
            res.status(200).json({
                success: true,
                todolists: req.user.todolists
            });
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                error: err
            });
        });
});

module.exports = router;