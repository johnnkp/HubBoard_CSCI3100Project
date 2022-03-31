/**
 * @api {delete} /api/user/todolist/contributor/removeContributor Remove contributor
 * @apiName RemoveContributor
 * @apiGroup User_Todolist_Contributor
 *
 * @apiBody {String} targetUsername Username of the target user
 * @apiBody {String} todolistId Id of the todolist
 *
 * @apiSuccess {Boolean} success true
 * @apiSuccess {String} message Success message
 *
 * @apiError {Boolean} success false
 * @apiError {String} message Error message
 */

const router = require('express').Router();
const Todolist = require('../../../../database/model/Todolist');
const User = require('../../../../database/model/User');

router.delete('/', (req, res) => {
    const { todolistId, targetUsername } = req.body;
    if (!todolistId || !targetUsername) {
        return res.status(400).json({
            success: false,
            message: 'todolistId and targetUsername are required'
        });
    }
    Todolist.findById(todolistId)
        .then(todolist=>{
            if (!todolist) {
                return res.status(404).json({
                    success: false,
                    message: 'todolist not found'
                });
            }
            else if (!todolist.isOwner(req.user._id)){
                return res.status(403).json({
                    success: false,
                    message: 'you are not the owner of this todolist'
                });
            }
            User.findOne({
                username: targetUsername
            })
                .then(targetUser=>{
                    if (!targetUser) {
                        return res.status(404).json({
                            success: false,
                            message: 'target user not found'
                        });
                    }
                    else if (todolist.isContributor(targetUser._id)){
                        todolist.contributors.pull(targetUser._id);
                        targetUser.todolists.pull(todolistId);
                        Promise.all([todolist.save(),targetUser.save()])
                            .then(()=>{
                                return res.status(200).json({
                                    success: true,
                                    message: 'contributor removed from todolist'
                                });
                            })
                            .catch(err=>{
                                return res.status(500).json({
                                    success: false,
                                    message: err.message
                                });
                            });
                    }
                    else {
                        return res.status(400).json({
                            success: false,
                            message: 'target user is not a contributor of this todolist'
                        });
                    }
                })
                .catch(err=>{
                    return res.status(500).json({
                        success: false,
                        message: err.message
                    });
                });
        })
        .catch(err=>{
            return res.status(500).json({
                success: false,
                message: err.message
            });
        });
});

module.exports = router;