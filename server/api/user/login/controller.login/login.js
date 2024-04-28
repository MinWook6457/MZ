const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const response = require('../../../../response');
const findUserByEmail = require('../service.login/findUserByEmail');
const loginUser = async (req, res) => {
    const userData = req.body;
    try {
        const user = await findUserByEmail(userData.email)

        // console.log(user)

        if (!user) {
            return response(res, 400, "존재하지 않는 사용자입니다.");
        }

        const matchPassword = await bcrypt.compare(userData.password, user.password);
        if (!matchPassword) {
            return response(res, 400, "비밀번호가 일치하지 않습니다.");
        }else{
            // 로그인 성공 시 세션 생성
            req.session.userData = user;
            console.log(req.session.userData);
            res.json({data : user , message : 'OK'})
            // return response(res, 200, user); 
        }
        /*
        req.session.loginData = user
        req.session.save(error => {
            if(error){
                console.log(error)
            }
        })
        */
    } catch (err) {
        console.error(err);
        return response(res, 500, '로그인에 실패했습니다.');
    }
};

module.exports = {
    loginUser
};
