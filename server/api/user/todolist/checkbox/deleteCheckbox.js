/**
 * @api {delete} /api/user/todolist/checkbox/deleteCheckbox Delete Checkbox
 * @apiName DeleteCheckbox
 * @apiGroup User_Todolist_Checkbox
 *
 * @apiBody {String} todolistId Todolist id
 * @apiBody {String} checkboxId Checkbox id
 *
 * @apiSuccess {Boolean} success true
 * @apiSuccess {String} message Success message
 * @apiSuccess {Object} todolist Todolist Object after creation
 *
 * @apiError {Boolean} success false
 * @apiError {String} message Error message
 *
 */

const router = require("express").Router();
const Todolist = require("../../../../database/model/Todolist");

router.delete("/", (req, res) => {
  const { todolistId, checkboxId } = req.body;
  if (!todolistId || !checkboxId) {
    return res.status(400).json({
      success: false,
      message: "checkboxId is required",
    });
  }
  // Find todolist
  Todolist.findById(todolistId)
    .then((todolist) => {
      if (!todolist) {
        return res.status(404).json({
          success: false,
          message: "todolist not found",
        });
      }
      // Check if current user is owner or contributor of todolist
      else if (!todolist.isOwnerOrContributor(req.user._id)) {
        return res.status(403).json({
          success: false,
          message: "You do not have permission to update this todolist",
        });
      }
      // Delete Checkbox
      const checkbox = todolist.checkboxes.id(checkboxId);
      if (!checkbox) {
        return res.status(404).json({
          success: false,
          message: "checkbox not found",
        });
      }
      checkbox.remove();
      todolist
        .save()
        .then(() => {
          res.status(200).json({
            success: true,
            message: "checkbox deleted",
            todolist: todolist,
          });
        })
        .catch((err) => {
          res.status(500).json({
            success: false,
            message: err.message,
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    });
});

module.exports = router;
