const { User } = require('../../../../model')

module.exports = async (email) => {
    try {
        const user = await User.findOne({
            where : {
                email : email
            }
        })
        return user
    } catch (err) {
        console.error(err);
    }
}