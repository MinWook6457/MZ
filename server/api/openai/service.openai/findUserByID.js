const {User} = require('../../../model')

module.exports = async(userId) => {
    try{
        const user = await User.findOne({
            where :{
                id : userId,
            }
        })

        return user
    }catch(err){
        console.log(err)
    }
}