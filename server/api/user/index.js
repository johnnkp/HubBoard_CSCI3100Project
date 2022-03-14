/*
    Handling /api/user requests (only for logged-in users)
*/
const router = require('express').Router();
const dir = require("require-dir")();


for (let route in dir){
    router.use('/' + route, dir[route]);
}

router.use('/interaction', require('./interaction'));

module.exports = router;