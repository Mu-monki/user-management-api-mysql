const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const UserModel = require('../model/UserModel');

const authenticate = asyncHandler(async (req, res, next) => {
    if(req.headers.authorization) {
        if(req.headers.authorization.startsWith('Bearer')) {
            try {
                const token = req.headers.authorization.split(' ')[1];
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                req.user = await UserModel.user(decoded.id);
                next();
            } catch (error) {
                console.log('err', error);
                res.status(401);
                throw error;
            }
        } else {
            res.status(401);
            throw new Error('Not Authorized');
        }
        
    } else {
        res.status(401);
        throw new Error('Not Authorized');
    }
});

module.exports = { authenticate };