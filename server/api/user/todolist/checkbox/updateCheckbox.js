/**
 * @api {put} /api/user/todolist/checkbox/updateCheckbox Update checkbox
 * @apiName UpdateCheckbox
 * @apiGroup User_Todolist_Checkbox
 *
 * @apiBody {String} todolistId Todolist id
 * @apiBody {String} checkboxId Checkbox id
 * @apiBody {Boolean} isChecked Optional. Checkbox is checked or not.
 * @apiBody {String} content Optional. Checkbox content.
 *
 * @apiSuccess {Boolean} success true.
 * @apiSuccess {String} message Success message.
 * @apiSuccess {Object} todolist Updated todolist.
 *
 * @apiError {Boolean} success false.
 * @apiError {String} message Error message.
 */

const router = require('express').Router();
const Todolist = require('../../../../database/model/Todolist');

router.put('/',(req,res)=> {
   const {todolistId, checkboxId, isChecked, content} = req.body;
   if (!todolistId || !checkboxId){
      return res.status(400).json({
         success: false,
         error: 'todolistId or checkboxId is required'
      });
   }
   Todolist.findById(todolistId)
       .then(todolist=>{
          if (!todolist.isOwnerOrContributor(req.user._id)) {
             return res.status(403).json({
                success: false,
                message: 'You do not have permission to update this todolist'
             });
          }
          const checkbox = todolist.checkboxes.id(checkboxId)
          if (!checkbox){
             return res.status(400).json({
                success: false,
                error: 'checkbox not found'
             });
          }
          if (isChecked !== undefined){
             checkbox.isChecked = isChecked;
          }
          checkbox.content = content || checkbox.content;
          todolist.save()
              .then(todolist=>{
                 res.status(200).json({
                    success: true,
                    message: 'checkbox updated',
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
       .catch(err=>{
          res.status(500).json({
             success: false,
             message: err.message
          });
       });
});

module.exports = router;