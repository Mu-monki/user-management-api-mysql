const express = require('express');
const router = express.Router();
const { 
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
} = require('../controllers/UserController');
const { authenticate } = require('../middleware/Authentication');

// USER ROUTES 
router.route('/')
    .get(authenticate, getUsers)
    .post(createUser);
router.route('/:id')
    .get(authenticate, getUser)
    .put(authenticate, updateUser)
    .delete(authenticate, deleteUser);

module.exports = router;