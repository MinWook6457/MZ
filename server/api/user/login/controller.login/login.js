const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const response = require('../../../../response');
const findUserByEmail = require('../service.login/findUserByEmail');

const loginUser = async (req, res) => {
    const userData = req.body;
    try {
        const user = await findUserByEmail(userData.email)

        console.log(user)

        if (!user) {
            return response(res, 400, "존재하지 않는 사용자입니다.");
        }

        const matchPassword = await bcrypt.compare(userData.password, user.password);
        if (!matchPassword) {
            return response(res, 400, "비밀번호가 일치하지 않습니다.");
        }

        // JWT 토큰 생성
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        
        res.cookie('accessToken', token, {maxAge : 3600000 , httpOnly : true})

        console.log(res.cookie('accessToken', token, {maxAge : 3600000 , httpOnly : true}));

        return response(res, 200, { user, accessToken : token }); 
    } catch (err) {
        console.error(err);
        return response(res, 500, '로그인에 실패했습니다.');
    }
};

module.exports = {
    loginUser
};
