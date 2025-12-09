const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const { verifyToken } = require('../middleware/auth');

// Get item image
router.get('/image/item', itemController.getItemImage);

// Get items by gender and category
router.get('/gender/:gender/category/:category', itemController.getItemsByGenderAndCategory);

// Get items by gender
router.get('/gender/:gender', itemController.getItemsByGender);

// Get items by category
router.get('/category/:category', itemController.getItemsByCategory);

// Get items by user
router.get('/:uid/user', itemController.getItemsByUser);

// Get item by ID
router.get('/:iid', itemController.getItemById);

// Get all items
router.get('/', itemController.getAllItems);

// Create item
router.post('/', verifyToken, itemController.createItem);

// Create multiple items (batch)
router.post('/batch', verifyToken, itemController.createItemsBatch);

// Update item
router.put('/:iid', verifyToken, itemController.updateItem);

// Delete item
router.delete('/:iid', verifyToken, itemController.deleteItem);

// Delete multiple items
router.delete('/', verifyToken, itemController.deleteItems);

module.exports = router;
