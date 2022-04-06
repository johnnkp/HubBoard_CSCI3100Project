/**
 * @api {put} /api/user/todolist/updateTodolist/ Update todolist
 * @apiName UpdateTodolist
 * @apiGroup User_Todolist
 *
 * @apiBody {String} todolistId id of the todolist to update
 * @apiBody {String} title Optional. Title to update
 * @apiBody {String} description Optional. Description to update
 * @apiBody {Boolean} isActive Optional. isActive to update
 *
 * @apiSuccess {Boolean} success true
 * @apiSuccess {String} message Success message
 * @apiSuccess {Object} todolist Updated todolist
 *
 * @apiError {Boolean} success false
 * @apiError {String} message Error message
 */

const router = require('express').Router();
const Todolist = require('../../../database/model/Todolist');

router.put('/', (req,res)=>{
    const {todolistId, title, description, isActive} = req.body;
    // Check if todolistId is valid
    if (!todolistId) {
        return res.status(400).json({
            success: false,
            message: 'todolistId is required'
        });
    }
    // Find todolist by todolistId
    Todolist.findById(todolistId)
        .then(todolist=>{
            if (!todolist) {
                return res.status(404).json({
                    success: false,
                    message: 'todolist not found'
                });
            }
            // Check if current user is the owner or contributor of the todolist
            else if (!(todolist.isOwnerOrContributor(req.user._id))) {
                return res.status(403).json({
                    success: false,
                    message: 'You do not have permission to update this todolist'
                });
            }
            // Update todolist with provided information
            todolist.title = title || todolist.title;
            todolist.description = description || todolist.description;
            if (isActive !== undefined) {
                todolist.isActive = isActive;
            }
            todolist.save()
                .then(todolist=>{
                    return res.status(200).json({
                        success: true,
                        message: 'todolist updated',
                        todolist: todolist
                    });
                })
                .catch(err=>{
                    return res.status(500).json({
                        success: false,
                        message: err.message
                    });
                });
        })
        .catch(err=>{
            res.status(500).json({
                success: false,
                message: err.message
            });
        });

})

module.exports = router;