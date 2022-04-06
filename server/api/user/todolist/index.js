/*
    Handling /api/user/todolist requests
*/

const router = require('express').Router();
const dir = require("require-dir")();

for (let route in dir){
    router.use('/' + route, dir[route]);
}

router.use('/checkbox', require('./checkbox'));
router.use('/contributor', require('./contributor'));
router.use('/comment', require('./comment'));

module.exports = router;