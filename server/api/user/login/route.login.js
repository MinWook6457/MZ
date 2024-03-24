const express = require('express');
const router = express.Router();
const login = require('./controller.login/login');
const path = require('path');
const { body } = require('express-validator');
const validate = require('../../../middleware/validate');

router.get('/create',
    [
        body('user_id').isInt(),
        body('email').isString(),
        body('password').isString()
    ],
    validate,
    login.createToken
);

module.exports = router;
