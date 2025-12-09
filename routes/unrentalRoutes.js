const express = require('express');
const router = express.Router();
const rentalController = require('../controllers/rentalController');

// Get unrental items by user, gender, and category
router.get('/:uid/:gender/:category', rentalController.getUnrentalItemsByUserGenderCategory);

module.exports = router;
