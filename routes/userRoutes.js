const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken, isAdmin } = require('../middleware/auth');

// Get users by role
router.get('/role', verifyToken, userController.getUsersByRole);

// Create user
router.post('/', userController.createUser);

// Update user
router.put('/:uid', verifyToken, userController.updateUser);

// Delete user
router.delete('/:uid', verifyToken, isAdmin, userController.deleteUser);

module.exports = router;
