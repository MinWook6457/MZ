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
        }else{
            // 로그인 성공 시 세션 생성

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
        return response(res, 200, 'login Success'); 

    } catch (err) {
        console.error(err);
        return response(res, 500, '로그인에 실패했습니다.');
    }
};

const logoutUser = async(req,res) => {
    try{
        if(!req.session.userData){
            return response(res,400,'인증되지 않은 유저 입니다.')
        }

        req.session.destroy() // 세션 파괴
        return response(res,200,'로그아웃 성공')
    }catch(err){
        return response(res,500,'로그아웃 중에 오류가 발생하였습니다.')
    }
}

module.exports = {
    loginUser,
    logoutUser
};
