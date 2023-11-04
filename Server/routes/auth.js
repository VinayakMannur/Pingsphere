const express = require('express');

const authController = require('../controllers/auth');

const router  = express.Router();

router.post('/signup', authController.signup, authController.sendOTP);

router.post('/login', authController.login);

router.post('/send-otp', authController.sendOTP)

router.post('/verify-otp', authController.verifyOTP);

router.post('/forgot-password', authController.forgotPassword);

router.post('/reset-password', authController.resetPassword);

module.exports = router;