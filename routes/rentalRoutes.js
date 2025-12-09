const express = require('express');
const router = express.Router();
const rentalController = require('../controllers/rentalController');
const { verifyToken } = require('../middleware/auth');

// Get rental items by user, gender, and category
router.get('/:uid/:gender/:category', rentalController.getRentalItemsByUserGenderCategory);

// Get rental item by ID
router.get('/:rid', rentalController.getRentalItemById);

// Get all rental items
router.get('/', rentalController.getAllRentalItems);

// Create rental item
router.post('/', verifyToken, rentalController.createRentalItem);

// Create multiple rental items (batch)
router.post('/batch', verifyToken, rentalController.createRentalItemsBatch);

// Update rental item
router.put('/:rid', verifyToken, rentalController.updateRentalItem);

// Delete rental item
router.delete('/:rid', verifyToken, rentalController.deleteRentalItem);

module.exports = router;
