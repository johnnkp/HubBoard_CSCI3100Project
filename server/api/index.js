const express = require("express");
const router = require('express').Router();
require('dotenv').config();
const {ensureAuthenticated, ensureAdmin} = require('../lib/passport');

router.use(express.json())
router.use(express.urlencoded({ extended: true }))

// Import the routes
router.use('/auth', require('./auth'));
router.use('/user', ensureAuthenticated, require('./user'));
router.use('/admin', ensureAuthenticated, ensureAdmin, require('./admin'));

module.exports = router;