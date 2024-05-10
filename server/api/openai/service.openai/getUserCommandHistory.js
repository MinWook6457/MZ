const {Command} = require('../../../model')

module.exports = async(userId) => {
    try {
        const history = await Command.findAll({
            where : {
                user_id : userId
            },
            attributes : [
                'content' , 'imgURL', 'createdAt'
            ]
        })
    
        return history
    } catch (error) {
        console.log(error);
    }

}