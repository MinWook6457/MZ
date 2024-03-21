require('dotenv').config()

const response = require('../../../response')

const readSendedContent = async(req,res) => {
    // 클라이언트로부터 날라온 프롬프트 
    const {content} = req.body
    
    try{
       
        
    }catch(err){
        return response(res,500,'')
    }
}

module.exports = {
    readSendedContent    
}