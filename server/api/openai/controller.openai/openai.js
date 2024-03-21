require('dotenv').config()

const response = require('../../../response')
const getImgURL = require('../service.openai/getImgURL')

const readSendedContent = async(req,res) => {
    // 클라이언트로부터 날라온 프롬프트 
    const user_id = req.body
    const content = req.body
    
    const imgURL = getImgURL(content)
    try{
        const user = await findUserByID(user_id)

        if(!user){
            return response(res,400,'유저 정보가 없습니다.')
        }

        await createPrompt(user_id,content,imgURL)
        
        return response(res,200,'Success created Command !!')
    }catch(err){
        return response(res,500,'Failed created Command !!')
    }
}

module.exports = {
    readSendedContent    
}