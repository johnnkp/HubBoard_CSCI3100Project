/**
 * @api {post} /api/user/todolist/createTodolist Create todolist
 * @apiName CreateTodolist
 * @apiGroup User_Todolist
 *
 * @apiBody {String} title Title of the todolist
 * @apiBody {String} description Optional. Description of the todolist
 *
 * @apiSuccess {Boolean} success True
 * @apiSuccess {Object} todolist The created todolist
 *
 * @apiSuccessExample Success-Response:
 * {
 *     "success": true,
 *     "todolist": {
 *         "owner": "621f6f49849ea9671627004e",
 *         "contributors": [],
 *         "title": "todolist title",
 *         "description": "todolist description",
 *         "active": true,
 *         "comments": [],
 *         "_id": "623b58dc2529210b39129903",
 *         "checkboxes": [],
 *         "__v": 0
 *     }
 * }
 *
 * @apiError {Boolean} success False
 * @apiError {String} message Error message
 */

const router = require('express').Router();
const Todolist = require('../../../database/model/Todolist');

router.post('/', (req, res) => {
    const { title, description } = req.body;
    // Check if title is provided
    if (!title) {
        return res.status(400).json({
            success: false,
            error: 'Title are required'
        });
    }
    // Create todolist
    Todolist.create({
        owner: req.user._id,
        title:title,
        description:description || '',
    })
        .then(todolist => {
            // Add todolist to user
            req.user.todolists.push(todolist._id);
            req.user.save()
                .then(() => {
                    res.status(201).json({
                        success: true,
                        todolist: todolist,
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        success: false,
                        message: err
                    });
                });
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                message: err
            });
        });

});

module.exports = router;