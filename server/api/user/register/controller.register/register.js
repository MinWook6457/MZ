const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const {User} = require('../../../../model')
const response = require('../../../../response')

const createUser = async(req,res) => {
    const userData = req.body
    console.log(userData)
    try{
        const hashedPassword = await bcrypt.hash(userData.password, 10); // 비밀번호 해싱

        const user = await User.create({
            email : userData.email,
            password : hashedPassword
        })

        const token = jwt.sign({ user_id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return response(res, 200, 'User created successfully', { token: token });
    }catch(err){
        return response(res,500,'Failed Create User')
    }
}

module.exports = {
    createUser
}