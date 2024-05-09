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

const logoutUser = async(req,res) => {

    try {
        if (!req.session.userData) {
            return res.status(400).json({ message: '로그인되지 않은 상태입니다.' });
        }

        // 세션 파괴
        req.session.destroy((error) => {
            if (error) {
                console.error('세션 파괴 중 오류:', error);
                return res.status(500).json({ message: '로그아웃 중에 오류가 발생했습니다.' });
            }

            res.clearCookie('connect.sid', {
                path: '/', // 쿠키 경로 설정
                httpOnly: true, // HTTP 전용 쿠키
                // secure: process.env.NODE_ENV === 'production', // 프로덕션 환경에서는 secure 옵션 사용
                sameSite: 'strict', // 쿠키의 SameSite 설정
              });        

            res.status(200).json({ message: '로그아웃 성공' });
        });

    } catch (error) {
        console.error('로그아웃 처리 중 오류:', error);
        res.status(500).json({ message: '서버 오류로 로그아웃에 실패했습니다.' });
    }
}

module.exports = {
    loginUser,
    logoutUser
}
