const authController = require('../Controllers/authController');
const express = require('express');
const router = express.Router();


router.post('/signup' , authController.signup);
router.post('/login', authController.login);

module.exports = router ;