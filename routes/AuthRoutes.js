const express = require('express');
const router = express.Router();
const { 
    loginUser
} = require('../controllers/AuthController');

// AUTH ROUTES 
router.route('/login').post(loginUser);

module.exports = router;