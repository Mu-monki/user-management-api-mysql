const jwt = require('jsonwebtoken');

const authenticatedUserToken = () => {
    const user_data = {
        id: 'test-id',
        first_name: 'Tester',
        last_name: 'Testerson',
        email: 'test@email.com',
        username: 'qa'
    };
    return jwt.sign({ ...user_data }, process.env.JWT_SECRET, {
        expiresIn: 120 // Expires in 2 mins
    });
}

module.exports = { 
    authenticatedUserToken 
};