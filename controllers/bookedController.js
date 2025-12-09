const db = require('../config/database');
const { v4: uuidv4 } = require('uuid');

// Get all booked items by user
const getBookedItemsByUser = async (req, res) => {
    try {
        const { uid } = req.params;

        const [bookedItems] = await db.query(
            `SELECT b.*, 
                    r.rental_price_by_days, r.currency, r.number_of_days,
                    i.item_name, i.item_category, i.gender,
                    s.size,
                    d.region, d.city, d.addrs
             FROM booked_items b
             JOIN rental_items r ON b.rental_item_id = r.iid
             JOIN items i ON r.item_id = i.iid
             LEFT JOIN sizes s ON b.size_id = s.iid
             LEFT JOIN deliveries d ON b.delivery_id = d.iid
             WHERE b.user_id = ?
             ORDER BY b.requested_start_date DESC`,
            [uid]
        );

        res.status(200).json(bookedItems);
    } catch (error) {
        console.error('Get booked items by user error:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Get all owner's items that are booked
const getBookedItemsByOwner = async (req, res) => {
    try {
        const { oid } = req.params;

        const [bookedItems] = await db.query(
            `SELECT b.*, 
                    r.rental_price_by_days, r.currency,
                    i.item_name, i.item_category, i.gender,
                    s.size,
                    u.first_name, u.last_name, u.email,
                    d.region, d.city, d.addrs, d.phone
             FROM booked_items b
             JOIN rental_items r ON b.rental_item_id = r.iid
             JOIN items i ON r.item_id = i.iid
             LEFT JOIN sizes s ON b.size_id = s.iid
             LEFT JOIN users u ON b.user_id = u.iid
             LEFT JOIN deliveries d ON b.delivery_id = d.iid
             WHERE b.owner_id = ?
             ORDER BY b.requested_start_date DESC`,
            [oid]
        );

        res.status(200).json(bookedItems);
    } catch (error) {
        console.error('Get booked items by owner error:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Get booked items by item and size
const getBookedItemsByItemAndSize = async (req, res) => {
    try {
        const { iid, sid } = req.params;

        const [bookedItems] = await db.query(
            `SELECT b.*, 
                    r.rental_price_by_days, r.currency,
                    i.item_name,
                    u.first_name, u.last_name
             FROM booked_items b
             JOIN rental_items r ON b.rental_item_id = r.iid
             JOIN items i ON r.item_id = i.iid
             LEFT JOIN users u ON b.user_id = u.iid
             WHERE r.item_id = ? AND b.size_id = ?
             ORDER BY b.requested_start_date DESC`,
            [iid, sid]
        );

        res.status(200).json(bookedItems);
    } catch (error) {
        console.error('Get booked items by item and size error:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Create booked item
const createBookedItem = async (req, res) => {
    try {
        const {
            rental_item_id,
            size_id,
            requested_start_date,
            duration,
            user_id,
            owner_id,
            delivery_id
        } = req.body;

        if (!rental_item_id || !requested_start_date || !duration || !user_id || !owner_id) {
            return res.status(400).json({ message: 'Required fields are missing' });
        }

        const bookedId = uuidv4();

        await db.query(
            `INSERT INTO booked_items (iid, rental_item_id, size_id, requested_start_date, duration, user_id, owner_id, delivery_id) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [bookedId, rental_item_id, size_id, requested_start_date, duration, user_id, owner_id, delivery_id]
        );

        res.status(201).json({
            message: 'Item booked successfully',
            booked: { iid: bookedId }
        });
    } catch (error) {
        console.error('Create booked item error:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Update booked item
const updateBookedItem = async (req, res) => {
    try {
        const { bid } = req.params;
        const updateData = req.body;

        // Check if booked item exists
        const [bookedItems] = await db.query('SELECT * FROM booked_items WHERE iid = ?', [bid]);
        
        if (bookedItems.length === 0) {
            return res.status(404).json({ message: 'Booked item not found' });
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

        updateValues.push(bid);
        const updateQuery = `UPDATE booked_items SET ${updateFields.join(', ')} WHERE iid = ?`;

        await db.query(updateQuery, updateValues);

        res.status(200).json({ message: 'Booked item updated successfully' });
    } catch (error) {
        console.error('Update booked item error:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Delete booked item
const deleteBookedItem = async (req, res) => {
    try {
        const { bid } = req.params;

        const [result] = await db.query('DELETE FROM booked_items WHERE iid = ?', [bid]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Booked item not found' });
        }

        res.status(200).json({ message: 'Booked item deleted successfully' });
    } catch (error) {
        console.error('Delete booked item error:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

module.exports = {
    getBookedItemsByUser,
    getBookedItemsByOwner,
    getBookedItemsByItemAndSize,
    createBookedItem,
    updateBookedItem,
    deleteBookedItem
};
