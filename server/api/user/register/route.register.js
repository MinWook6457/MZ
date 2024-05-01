const express = require('express');
const bcrypt = require('bcrypt');
const { body } = require('express-validator');
const validate = require('../../../middleware/validate');
const { User } = require('../../../model');

const router = express.Router();

// '/register/createUser' 경로에 대한 POST 요청 처리
router.post(
  '/createUser',
  validate([
    body('name').isString(),
    body('email').isEmail(),
    body('password').isString(),
  ]),
  async (req, res) => {
    const { name, email, password } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10); // 비밀번호 해싱
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
      });

      res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
      console.error('오류:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
);

module.exports = router;
