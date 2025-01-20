const express = require('express');
const registerUser = require('../controller/registerUser');
const checkPhone = require('../controller/checkPhone');
const checkPassword = require('../controller/checkPassword');
const userDetails = require('../controller/userDetails');

const router = express.Router();

// Create user api
router.post('/register', registerUser);

// Check user phone
router.post('/phone', checkPhone);

// Check user password
router.post('/password', checkPassword);

// Login user details
router.get('/user-details', userDetails);
module.exports = router;