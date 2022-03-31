/*
    Handling /api/user/todolist/comment requests
*/

const router = require('express').Router();
const dir = require("require-dir")();


for (let route in dir){
    router.use('/' + route, dir[route]);
}

module.exports = router;