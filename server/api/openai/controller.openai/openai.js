require('dotenv').config()

const {User , Command} = require('../../../model')

const findUserByID = require('../service.openai/findUserByID')
const response = require('../../../response')
const getImgURL = require('../service.openai/getImgURL')

const readSendedContent = async(req,res) => {
    // 클라이언트로부터 날라온 프롬프트 
    const {user_id,prompt} = req.body 
    const imgURL = await getImgURL(prompt); 
    console.log(user_id,prompt,imgURL);
    try{
        const user = await findUserByID(user_id)

        if(!user){
            return response(res,400,'유저 정보가 없습니다.')
        }

        const command = await Command.create({
            content: prompt,
            imgURL: imgURL,
            user_id: user_id // 명령과 사용자 간의 관계 설정
        }); 
        
        return response(res,200, command)
    }catch(err){
        return response(res,500,'Failed created Command !!')
    }
}

module.exports = {
    readSendedContent    
}