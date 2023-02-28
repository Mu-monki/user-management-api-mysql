const asyncHandler = require('express-async-handler');
const UserModel = require('../model/UserModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const result = await UserModel.getUserByEmail(email);
    let user = null;

    if(result) {
        user = result[0];
    }

    if(user && (bcrypt.compareSync(password, user.password))) {
        const user_data = {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            username: user.username
        };
        res.json({
            ...user_data,
            token: generateToken(user_data)
        });
    } else {
        res.status(400);
        throw new Error('Invalid Credentials');
    }
});

const generateToken = (user_data) => {
    return jwt.sign({ ...user_data }, process.env.JWT_SECRET, {
        expiresIn: '10d'
    });
}

module.exports = {
    loginUser
}