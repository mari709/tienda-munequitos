const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');



router.get('/login', authController.loginView);
router.post('/login', authController.loginUser);
router.get('/register', authController.registerView);
router.post('/register',authController.registerUser);
router.get('/logout', authController.Logout);

module.exports = router;