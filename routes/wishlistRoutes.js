const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlistController');
const { verifyToken } = require('../middleware/auth');

// Get user wishlist
router.get('/:uid', verifyToken, wishlistController.getUserWishlist);

// Add to wishlist
router.post('/', verifyToken, wishlistController.addToWishlist);

// Remove from wishlist
router.delete('/:uid/:iid', verifyToken, wishlistController.removeFromWishlist);

module.exports = router;
