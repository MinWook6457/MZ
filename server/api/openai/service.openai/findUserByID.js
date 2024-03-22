const {User} = require('../../../model')

module.exports = async(userId) => {
    try{
        const user = await User.findOne({
            where :{
                id : userId,
            },
            attributes : [
                'email' , 'password'
            ]
        })

        return user
    }catch(err){
        console.log(err)
    }
}