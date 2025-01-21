const express = require('express');
const registerUser = require('../controller/registerUser');
const checkPhone = require('../controller/checkPhone');
const checkPassword = require('../controller/checkPassword');
const loginUser = require('../controller/loginUser');
const userDetails = require('../controller/userDetails');
const updateUserDetails = require('../controller/updateUserDetails');
const logout = require('../controller/logout');

const router = express.Router();

// Create user api
router.post('/register', registerUser);

// Check user phone
router.post('/phone', checkPhone);

// Check user password (Login)
router.post('/password', checkPassword);

// Login user with phone and password
router.post('/login', loginUser);

// Get user details
router.get('/user-details', userDetails);

// Update user details
router.post('/update-user', updateUserDetails);

// Logout user
router.get('/logout', logout);

module.exports = router;