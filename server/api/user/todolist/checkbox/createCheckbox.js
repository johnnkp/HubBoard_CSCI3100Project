/**
 * @api {post} /api/user/todolist/checkbox/createCheckbox Create Checkbox
 * @apiName CreateCheckbox
 * @apiGroup User_Todolist_Checkbox
 *
 * @apiBody {String} todolistId Todolist id
 * @apiBody {String} checkboxContent Optional (default: ""). Checkbox Content
 *
 * @apiSuccess {Boolean} success true
 * @apiSuccess {String} message Success message
 * @apiSuccess {Object} todolist Todolist Object after creation
 *
 * @apiError {Boolean} success false
 * @apiError {String} message Error message
 *
 */

const router = require('express').Router();
const Todolist = require('../../../../database/model/Todolist');

router.post('/',(req,res)=>{
    const {todolistId,checkboxContent} = req.body;
    if (!todolistId) {
        return res.status(400).json({
            success: false,
            message: 'todolistId and checkboxContent are required'
        });
    }
    Todolist.findById(todolistId)
        .then(todolist=>{
            if(!todolist){
                return res.status(404).json({
                    success: false,
                    message: 'todolist not found'
                });
            }
            else if (!todolist.isOwnerOrContributor(req.user._id)){
                return res.status(403).json({
                    success: false,
                    message: 'You do not have permission to update this todolist'
                });
            }
            todolist.checkboxes.push({
                content: checkboxContent || "",
            });
            todolist.save()
                .then(todolist=>{
                    res.status(200).json({
                        success: true,
                        message: 'checkbox created',
                        todolist: todolist
                    });
                })
                .catch(err=>{
                    res.status(500).json({
                        success: false,
                        message: err.message
                    });
                });
        })

})

module.exports = router;