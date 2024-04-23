const express = require('express')
const router = express.Router()

const path = require('path');
const validate = require('../../middleware/validate')

const tensor = require('./controller.tensor/tensor')

const { body } = require('express-validator');

router.post('/createModel', // 모델 생성
    validate([
        body('prompt').notEmpty()
    ])

)