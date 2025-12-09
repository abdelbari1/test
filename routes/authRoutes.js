const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Login route
router.get('/login', authController.login);

// Register route (if needed separately)
router.post('/users', authController.register);

module.exports = router;
