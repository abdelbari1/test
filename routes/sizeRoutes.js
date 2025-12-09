const express = require('express');
const router = express.Router();
const sizeController = require('../controllers/sizeController');
const { verifyToken } = require('../middleware/auth');

// Get sizes by item
router.get('/item/:iid', sizeController.getSizesByItem);

// Create size
router.post('/', verifyToken, sizeController.createSize);

// Update size
router.put('/:sid', verifyToken, sizeController.updateSize);

// Delete size
router.delete('/:sid', verifyToken, sizeController.deleteSize);

module.exports = router;
