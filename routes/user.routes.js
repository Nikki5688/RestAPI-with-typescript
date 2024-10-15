const express = require('express');
const { signup, login } = require('../controllers/user.controller');
const userValidation = require('../validations/user.validation');

const router = express.Router();

// Route for user signup, applying the userValidation middleware before calling the signup controller function
router.post('/signup', userValidation, signup);

// Route for user login, directly calling the login controller function
router.post('/login', login);

module.exports = router;
