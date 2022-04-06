/**
 * @api {post} /api/user/todolist/comment/addComment Add comment
 * @apiName AddComment
 * @apiGroup User_Todolist_Comment
 *
 * @apiBody {String} todolistId Todolist id
 * @apiBody {String} content Comment content
 *
 * @apiSuccess {Boolean} success true.
 * @apiSuccess {Object} comment Created comment object.
 * @apiSuccess {Object} todolist Updated todolist object.
 *
 * @apiError {Boolean} success false.
 * @apiError {String} message Error message.
 */

const router = require('express').Router();
const Todolist = require('../../../../database/model/Todolist');
const Comment = require('../../../../database/model/Todolist/Comment');

router.post('/',(req,res)=>{
    const {todolistId,content} = req.body;
    if (!todolistId || !content) {
        return res.status(400).json({
            success: false,
            message: 'todolistId and content are required'
        });
    }
    else {
        Todolist.findById(todolistId)
            .then(todolist=>{
                if (!todolist){
                    return res.status(404).json({
                        success: false,
                        message: 'todolist not found'
                    });
                }
                else if (!todolist.isOwnerOrContributor(req.user._id)){
                    return res.status(403).json({
                        success: false,
                        message: 'you do not have permission to add a comment'
                    });
                }
                else {
                    Comment.addComment(todolistId,req.user._id,content)
                        .then(result=>{
                            return res.status(200).json({
                                success: true,
                                comment: result.comment,
                                todolist : result.todolist
                            });
                        })
                        .catch(err=>{
                            return res.status(500).json({
                                success: false,
                                message: err.message
                            });
                        });

                }
            })
    }
})

module.exports = router;