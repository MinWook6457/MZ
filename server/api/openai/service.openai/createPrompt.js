const {Command} = require('../../../model')

module.exports = async(user_id,content,imgURL) => {
    try{
        await Command.create({
            user_id : user_id,
            content : content,
            imgURL : imgURL
        })
    } catch(err){
        console.log('')
    }
}