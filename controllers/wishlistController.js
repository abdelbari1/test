const db = require('../config/database');

// Get user wishlist
const getUserWishlist = async (req, res) => {
    try {
        const { uid } = req.params;

        const [wishlist] = await db.query(
            `SELECT w.user_id, w.item_id, i.* 
             FROM wishlists w 
             JOIN items i ON w.item_id = i.iid 
             WHERE w.user_id = ?`,
            [uid]
        );

        res.status(200).json(wishlist);
    } catch (error) {
        console.error('Get user wishlist error:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Add item to wishlist
const addToWishlist = async (req, res) => {
    try {
        const { user_id, item_id } = req.body;

        if (!user_id || !item_id) {
            return res.status(400).json({ message: 'user_id and item_id are required' });
        }

        // Check if already in wishlist
        const [existing] = await db.query(
            'SELECT * FROM wishlists WHERE user_id = ? AND item_id = ?',
            [user_id, item_id]
        );

        if (existing.length > 0) {
            return res.status(409).json({ message: 'Item already in wishlist' });
        }

        await db.query(
            'INSERT INTO wishlists (user_id, item_id) VALUES (?, ?)',
            [user_id, item_id]
        );

        res.status(201).json({ message: 'Item added to wishlist successfully' });
    } catch (error) {
        console.error('Add to wishlist error:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Remove item from wishlist
const removeFromWishlist = async (req, res) => {
    try {
        const { uid, iid } = req.params;

        const [result] = await db.query(
            'DELETE FROM wishlists WHERE user_id = ? AND item_id = ?',
            [uid, iid]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Wishlist item not found' });
        }

        res.status(200).json({ message: 'Item removed from wishlist successfully' });
    } catch (error) {
        console.error('Remove from wishlist error:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

module.exports = {
    getUserWishlist,
    addToWishlist,
    removeFromWishlist
};
