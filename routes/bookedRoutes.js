const express = require('express');
const router = express.Router();
const bookedController = require('../controllers/bookedController');
const { verifyToken } = require('../middleware/auth');

// Get booked items by user
router.get('/user/:uid', verifyToken, bookedController.getBookedItemsByUser);

// Get booked items by owner
router.get('/owner/:oid', verifyToken, bookedController.getBookedItemsByOwner);

// Get booked items by item and size
router.get('/:iid/size/:sid', bookedController.getBookedItemsByItemAndSize);

// Create booked item
router.post('/', verifyToken, bookedController.createBookedItem);

// Update booked item
router.put('/:bid', verifyToken, bookedController.updateBookedItem);

// Delete booked item
router.delete('/:bid', verifyToken, bookedController.deleteBookedItem);

module.exports = router;
