const asyncHandler = require('express-async-handler');
const UserModel = require('../model/UserModel');
const jwt = require('jsonwebtoken');

const getUsers = asyncHandler(async (req, res) => {
    const data = await UserModel.users();
    
    res.status(200).json({
        message: 'Get Users',
        data: data
    });
});

const getUser = asyncHandler(async (req, res) => {
    // VALIDATION
    if(!req.params.id) {
        res.status(400);
        throw new Error('Bad Request');
    }

    const data = await UserModel.user(req.params.id);
    console.log('user', data.length);
    if(!data.length) {
        res.status(404);
        throw new Error('User not Found');
    }
    res.status(200).json({
        message: `Get User ${ req.params.id }`,
        data: data
    });
});

const createUser = asyncHandler(async (req, res) => {
    const params = req.body;
    // VALIDATION
    if ( 
        !params.first_name || 
        !params.last_name || 
        !params.address ||
        !params.post_code ||
        !params.phone_number ||
        !params.email ||
        !params.username ||
        !params.password
    ) {
        res.status(400);
        throw new Error('Bad Request');
    }

    const data = await UserModel.createUser(params);
    res.status(200).json({
        message: 'Created User',
        data: data
    });
});

const updateUser = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const params = req.body;

    // VALIDATION
    if ( 
        !params.first_name || 
        !params.last_name || 
        !params.address ||
        !params.post_code ||
        !params.phone_number ||
        !params.email ||
        !params.username ||
        !params.password
    ) {
        res.status(400);
        throw new Error('Bad Request');
    }

    const data = await  UserModel.updateUser(id, params);
    res.status(200).json({
        message: `Updated User ${ req.params.id }`,
        data: data
    });
});

const deleteUser = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const user = await UserModel.user(id);
    // VALIDATION
    if(!id) {
        res.status(400);
        throw new Error('Bad Request');
    }
    if(!user.length) {
        res.status(404);
        throw new Error('User Not Found');
    }
    const data = await  UserModel.deleteUser(id);
    res.status(200).json({
        message: `Deleted User ${ req.params.id }`,
        data: data
    });
});

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}