const express = require('express');
const router = express.Router();
const deliveryController = require('../controllers/deliveryController');
const { verifyToken } = require('../middleware/auth');

// Get delivery by user
router.get('/:uid', verifyToken, deliveryController.getDeliveryByUser);

// Create delivery
router.post('/', verifyToken, deliveryController.createDelivery);

// Update delivery
router.put('/:did', verifyToken, deliveryController.updateDelivery);

// Delete delivery
router.delete('/:did', verifyToken, deliveryController.deleteDelivery);

module.exports = router;
