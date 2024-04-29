const express = require('express');
const router = express.Router();
const userInfo = require('./controller.userInfo/userInfo')
const path = require('path');
const { body } = require('express-validator');
const validate = require('../../../middleware/validate');

router.get('/userInfo',
    validate([
    body('userId').notEmpty()
    ]),
    userInfo.readUserInfo
);

module.exports = router