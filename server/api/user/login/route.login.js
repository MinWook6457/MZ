const express = require('express');
const router = express.Router();
const login = require('./controller.login/login');
const path = require('path');
const { body } = require('express-validator');
const validate = require('../../../middleware/validate');

const authToken = require('../../../middleware/authToken')

// router.use(authToken)

// 로그인
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
router.post('/logout', login.logoutUser)

module.exports = router;
