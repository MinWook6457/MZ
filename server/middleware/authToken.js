require('dotenv').config()

const jwt = require('jsonwebtoken')

module.exports = (req,res,next) => {
    try{
        const token = jwt.verify(req.headers.authorization,process.env.ACCESS_TOKEN_SECRET)
    
        if(token.type !== 'accessToken'){
            return res.status(401).json({
                code : 401,
                message : 'cant used this token'
            })
        }
        req.decoded = token
        return next()

    }catch(err){
        // 유효 시간 초과
        if(err.name === 'TokenExpiredError'){
            return res.status(419).json({
                code : 419,
                message : 'token is expired'
            })
        }

        // 시크릿 키 일치 하지 않음
        if(err.name === 'JsonWebTokenError'){
            return res.status(401).json({
                code : 401,
                message : 'token is not same'
            })
        }

    }
}