const express = require('express');
const router = express.Router();
const purchaseController = require('../controllers/purchaseController');
const { verifyToken } = require('../middleware/auth');

// Get purchases by seller
router.get('/seller/:sid', verifyToken, purchaseController.getPurchasesBySeller);

// Get sold items by owner
router.get('/owner/:uid', verifyToken, purchaseController.getSoldItemsByOwner);

// Get purchase by ID
router.get('/:pid', verifyToken, purchaseController.getPurchaseById);

// Create purchase
router.post('/', verifyToken, purchaseController.createPurchase);

// Update purchase
router.put('/:pid', verifyToken, purchaseController.updatePurchase);

// Delete purchase
router.delete('/:pid', verifyToken, purchaseController.deletePurchase);

module.exports = router;
