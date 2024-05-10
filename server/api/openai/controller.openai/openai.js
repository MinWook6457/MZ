require('dotenv').config()

const {User , Command} = require('../../../model')

const findUserByID = require('../service.openai/findUserByID')
const response = require('../../../response')
const getImgURL = require('../service.openai/getImgURL')
const getUserCommandHistory = require('../service.openai/getUserCommandHistory')

const readSendedContent = async(req,res) => {
    const {userId,prompt} = req.body  // 클라이언트로부터 날라온 프롬프트 
    const imgURL = await getImgURL(prompt); 
    console.log(userId,prompt,imgURL);
    try{
        const user = await findUserByID(userId)

        if(!user){
            return response(res,400,'유저 정보가 없습니다.')
        }

        const command = await Command.create({
            content: prompt,
            imgURL: imgURL,
            user_id: userId // 명령과 사용자 간의 관계 설정
        }); 

        const sendImgUrl = command.imgURL
        console.log(sendImgUrl)
        
        return response(res,200, sendImgUrl)
    }catch(err){
        return response(res,500,'Failed created Command !!')
    }
}

const historyCommand = async(req,res) => {
    const userId = req.body.userId
    try {
        console.log(userId)
        const user = await findUserByID(userId)

        console.log(user);

        if(!user){
            return response(res,400,'유저 정보가 없습니다.')
        }

        const history = await getUserCommandHistory(userId)

        console.log(history);
        

        return response(res,200,history)

    } catch (error) {
        return response(res,500,'Failed created History Command')
    }
}

module.exports = {
    readSendedContent ,
    historyCommand  
}