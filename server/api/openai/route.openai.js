const express = require('express')
const router = express.Router()
const openai = require('./controller.openai/openai')
const path = require('path');
const validate = require('../../middleware/validate')

const { body } = require('express-validator');

router.post('/read',  // 프롬프트 받아오기
    validate([
    body('userId').isInt(),
    body('prompt').isString(),
    ]),
    openai.readSendedContent
)
/*
router.post('/create', // 생성된 이미지 url 프론트에 날리기
    validate([
        body('imgURL').isString(),
    ]),
    openai.createImg
)
*/
module.exports = router;