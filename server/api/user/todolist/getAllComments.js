/**
 * @api {get} /api/user/todolist/getAllComments/:todolistId Get all comments of a todolist
 * @apiName GetAllComments
 * @apiGroup User_Todolist
 *
 * @apiParam {String} todolistId The id of the todolist
 *
 * @apiSuccess {Boolean} success true
 * @apiSuccess {Object[]} comments The comments of the todolist
 *
 * @apiError {Boolean} success false
 * @apiError {String} message The error message
 */

const router = require('express').Router();
const Todolist = require('../../../database/model/Todolist');


router.get('/:todolistId',(req,res)=>{
    const {todolistId} = req.params;
    if (!todolistId) {
        res.status(400).json({
            success: false,
            message: 'Bad Request'
        });
    } else {
        Todolist.findById(todolistId)
            .then(todolist => {
                if (!todolist) {
                    res.status(404).json({
                        success: false,
                        message: 'Todolist not found'
                    });
                } else {
                    todolist.populate({
                        path: 'comments',
                        populate: {
                            path: 'sender',
                            select: 'username',
                        }
                    })
                        .then(todolist => {
                            res.status(200).json({
                                success: true,
                                comments: todolist.comments
                            });
                        })
                        .catch(err => {
                            res.status(500).json({
                                success: false,
                                message: err.message
                            });
                        });
                }
            })
            .catch(err => {
                res.status(500).json({
                    success: false,
                    message: err.message
                });
            });
    }
})

module.exports = router;