const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { User } = require('../../../../model');
const response = require('../../../../response');

const createUser = async (req, res) => {
    const { name, email, password } = req.body;    
    console.log('회원가입 라우팅 확인')
    try {
        const hashedPassword = await bcrypt.hash(password, 10); // Password hashing

        const user = await User.create({
            name : name,
            email: email,
            password: hashedPassword
        });

        console.log(user)

        const test = await User.findOne({
            where : {
                name : user.name
            },
            attributes : ['id','name']
        })

        const result = [test.id , test.name]

        return response(res, 200,user);
    } catch (err) {
        console.error(err);
        return response(res, 500, 'Failed to Create User');
    }
};

module.exports = {
    createUser
};
