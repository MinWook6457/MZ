const express = require('express');
const router = express.Router();
const register = require('./controller.register/register')
const path = require('path');
const { body } = require('express-validator');
const validate = require('../../../middleware/validate');
const authToken = require('../../../middleware/authToken')

// router.use(authToken)

router.post('/test',
    [
        body('email').isString(),
        body('password').isString()
    ],
    validate,
    register.createUser
);

module.exports = router
