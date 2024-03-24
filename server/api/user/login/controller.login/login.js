require('dotenv').config()

const response = require('../../../../response')

const jwt = require('jsonwebtoken')

const SECRET_KEY = 'MY-SECRET-KEY'

const createToken = async(req,res) => {
    const {user_id,email,password} = req.body

    try{
        //jwt.sign(payload, secretOrPrivateKey, [options, callback])
        token = jwt.sign({
            type: 'JWT',
            email: email,
            password: password
          }, SECRET_KEY, {
            expiresIn: '15m', // 만료시간 15분
            issuer: '토근 발급자',
          });
          return response(token,200,'토큰 발급 완료')
    }catch(err){
        return response(res,500,'Failed JWT Login !!')
    }

}

module.exports = {
    createToken
}