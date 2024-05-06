const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const response = require('../../../../response');
const findUserByEmail = require('../service.login/findUserByEmail');
const loginUser = async (req, res) => {
    const {email , password} = req.body
    console.log(email, password)
    try {
        const user = await findUserByEmail(email)

        console.log(user)

        if (!user) {
            return response(res, 400, "존재하지 않는 사용자입니다.");
        }

        const matchPassword = await bcrypt.compare(password, user.password);
        if (!matchPassword) {
            return response(res, 400, "비밀번호가 일치하지 않습니다.");
        }
        // 세션 매핑
        req.session.userData = {
            id: user.id,
            email: user.email,
            name: user.name,
        };
        
        // 세션 저장 후 로그인 성공 응답
        req.session.save((error) => {
            if (error) {
                console.error('세션 저장 중 오류:', error);
                return response(res, 500, '로그인 중에 오류가 발생했습니다.');
            }
            // 로그인 성공 시 사용자 데이터를 반환
            res.status(200).json({ message: '로그인 성공', user: req.session.userData });
        });

    } catch (err) {
        console.error(err);
        return response(res, 500, '로그인에 실패했습니다.');
    }
}

module.exports = {
    loginUser
}
