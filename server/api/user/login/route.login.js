const express = require('express');
const router = express.Router();
const login = require('./controller.login/login');
const path = require('path');
const { body } = require('express-validator');
const validate = require('../../../middleware/validate');

const authToken = require('../../../middleware/authToken')

// router.use(authToken)

router.post('/login', 
    validate([
        body('email').isString(),
        body('password').isString(),
    ]),
    login.loginUser
)

// 로그인 상태 확인
router.get('/loginCheck', (req, res) => {
    if (req.session.userData) {
        res.send({ loggedIn: true, user: req.session.userData });
    } else {
        res.send({ loggedIn: false });
    }
});


// 로그아웃
router.post('/logout', (req, res) => {
    if (req.session.userData) {
        req.session.destroy((err) => {
            if (err) {
                console.error('세션 파괴 중 오류:', err);
                return res.status(500).send({ message: '로그아웃에 실패했습니다.' });
            }
            return res.status(200).send({ message: '로그아웃 성공' });
        });
    } else {
        return res.status(400).send({ message: '로그인하지 않았습니다.' });
    }
});

module.exports = router;
