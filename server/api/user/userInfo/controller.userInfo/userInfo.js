const response = require('../../../../response')
const User = require('../../../../model')

const readUserInfo = async(req,res) => {
    const userId = req.body
    try{
        const user = await User.findOne({
            where : {
                id : userId
            }
        })

        console.log(user)

        if(!user){
            return response(res,400,'유저 정보가 없습니다.')
        }

        return response(res,200,user) // 유저 정보 조회
    }catch(err){
        return response(res,500,'유저 정보 조회 중에 오류가 발생하였습니다.')
    }
}

module.exports = readUserInfo