const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { User } = require('../../../../model');
const response = require('../../../../response');

const createUser = async (req, res) => {
    const userData  = req.body;
    console.log(userData);
    try {
        const hashedPassword = await bcrypt.hash(userData.password, 10); // Password hashing

        const user = await User.create({
            name : userData.name,
            email: userData.email,
            password: hashedPassword
        });

        console.log(user)

        return response(res, 200, 'Success to Create User');
    } catch (err) {
        console.error(err);
        return response(res, 500, 'Failed to Create User');
    }
};

module.exports = {
    createUser
};
