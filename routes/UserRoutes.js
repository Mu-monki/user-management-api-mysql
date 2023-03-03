const express = require('express');
const router = express.Router();
const { 
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    deleteUsers
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
router.route('/delete-batch')
    .post(authenticate, deleteUsers)

module.exports = router;