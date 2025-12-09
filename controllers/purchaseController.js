const db = require('../config/database');
const { v4: uuidv4 } = require('uuid');

// Get purchase by ID
const getPurchaseById = async (req, res) => {
    try {
        const { pid } = req.params;

        const [purchases] = await db.query(
            `SELECT p.*, 
                    u1.first_name as buyer_first_name, u1.last_name as buyer_last_name,
                    u2.first_name as seller_first_name, u2.last_name as seller_last_name,
                    d.region, d.addrs, d.city, d.phone
             FROM purchases p
             LEFT JOIN users u1 ON p.buyer_id = u1.iid
             LEFT JOIN users u2 ON p.seller_id = u2.iid
             LEFT JOIN deliveries d ON p.delivery_id = d.iid
             WHERE p.iid = ?`,
            [pid]
        );

        if (purchases.length === 0) {
            return res.status(404).json({ message: 'Purchase not found' });
        }

        // Get request lines for this purchase
        const [requestLines] = await db.query(
            `SELECT rl.*, i.item_name, i.actual_price, i.currency
             FROM request_lines rl
             JOIN items i ON rl.item_id = i.iid
             WHERE rl.purchase_id = ?`,
            [pid]
        );

        res.status(200).json({
            ...purchases[0],
            items: requestLines
        });
    } catch (error) {
        console.error('Get purchase by ID error:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Get all purchases for seller
const getPurchasesBySeller = async (req, res) => {
    try {
        const { sid } = req.params;

        const [purchases] = await db.query(
            `SELECT p.*, 
                    u1.first_name as buyer_first_name, u1.last_name as buyer_last_name,
                    d.region, d.city
             FROM purchases p
             LEFT JOIN users u1 ON p.buyer_id = u1.iid
             LEFT JOIN deliveries d ON p.delivery_id = d.iid
             WHERE p.seller_id = ?
             ORDER BY p.purchase_date DESC`,
            [sid]
        );

        res.status(200).json(purchases);
    } catch (error) {
        console.error('Get purchases by seller error:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Get sold items by owner
const getSoldItemsByOwner = async (req, res) => {
    try {
        const { uid } = req.params;

        const [soldItems] = await db.query(
            `SELECT p.*, i.item_name, i.actual_price, rl.quantity, rl.size
             FROM purchases p
             JOIN request_lines rl ON p.iid = rl.purchase_id
             JOIN items i ON rl.item_id = i.iid
             WHERE i.user_id = ?
             ORDER BY p.purchase_date DESC`,
            [uid]
        );

        res.status(200).json(soldItems);
    } catch (error) {
        console.error('Get sold items by owner error:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Create purchase order
const createPurchase = async (req, res) => {
    try {
        const {
            buyer_id,
            seller_id,
            delivery_id,
            purchase_status,
            purchase_item_status,
            items // Array of { item_id, size, quantity }
        } = req.body;

        if (!buyer_id || !seller_id || !delivery_id || !purchase_status || !purchase_item_status || !items || items.length === 0) {
            return res.status(400).json({ message: 'Required fields are missing' });
        }

        const purchaseId = uuidv4();
        const purchaseDate = new Date();

        // Create purchase
        await db.query(
            `INSERT INTO purchases (iid, buyer_id, seller_id, delivery_id, purchase_status, purchase_item_status, purchase_date) 
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [purchaseId, buyer_id, seller_id, delivery_id, purchase_status, purchase_item_status, purchaseDate]
        );

        // Create request lines
        const requestLinePromises = items.map(item => {
            return db.query(
                'INSERT INTO request_lines (item_id, size, purchase_id, quantity) VALUES (?, ?, ?, ?)',
                [item.item_id, item.size, purchaseId, item.quantity]
            );
        });

        await Promise.all(requestLinePromises);

        res.status(201).json({
            message: 'Purchase created successfully',
            purchase: { iid: purchaseId, purchase_date: purchaseDate }
        });
    } catch (error) {
        console.error('Create purchase error:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Update purchase
const updatePurchase = async (req, res) => {
    try {
        const { pid } = req.params;
        const updateData = req.body;

        // Check if purchase exists
        const [purchases] = await db.query('SELECT * FROM purchases WHERE iid = ?', [pid]);
        
        if (purchases.length === 0) {
            return res.status(404).json({ message: 'Purchase not found' });
        }

        const updateFields = [];
        const updateValues = [];

        Object.keys(updateData).forEach(key => {
            if (updateData[key] !== undefined && key !== 'iid') {
                updateFields.push(`${key} = ?`);
                updateValues.push(updateData[key]);
            }
        });

        if (updateFields.length === 0) {
            return res.status(400).json({ message: 'No fields to update' });
        }

        updateValues.push(pid);
        const updateQuery = `UPDATE purchases SET ${updateFields.join(', ')} WHERE iid = ?`;

        await db.query(updateQuery, updateValues);

        res.status(200).json({ message: 'Purchase updated successfully' });
    } catch (error) {
        console.error('Update purchase error:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Delete purchase
const deletePurchase = async (req, res) => {
    try {
        const { pid } = req.params;

        // Delete request lines first
        await db.query('DELETE FROM request_lines WHERE purchase_id = ?', [pid]);

        // Delete purchase
        const [result] = await db.query('DELETE FROM purchases WHERE iid = ?', [pid]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Purchase not found' });
        }

        res.status(200).json({ message: 'Purchase deleted successfully' });
    } catch (error) {
        console.error('Delete purchase error:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

module.exports = {
    getPurchaseById,
    getPurchasesBySeller,
    getSoldItemsByOwner,
    createPurchase,
    updatePurchase,
    deletePurchase
};
