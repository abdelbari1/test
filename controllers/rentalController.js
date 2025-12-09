const db = require('../config/database');
const { v4: uuidv4 } = require('uuid');

// Get all rental items
const getAllRentalItems = async (req, res) => {
    try {
        const [rentalItems] = await db.query(
            `SELECT r.*, i.item_name, i.item_category, i.gender, i.description, i.user_id
             FROM rental_items r
             JOIN items i ON r.item_id = i.iid`
        );

        res.status(200).json(rentalItems);
    } catch (error) {
        console.error('Get all rental items error:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Get rental item by ID
const getRentalItemById = async (req, res) => {
    try {
        const { rid } = req.params;

        const [rentalItems] = await db.query(
            `SELECT r.*, i.item_name, i.item_category, i.gender, i.description, i.user_id
             FROM rental_items r
             JOIN items i ON r.item_id = i.iid
             WHERE r.iid = ?`,
            [rid]
        );

        if (rentalItems.length === 0) {
            return res.status(404).json({ message: 'Rental item not found' });
        }

        res.status(200).json(rentalItems[0]);
    } catch (error) {
        console.error('Get rental item by ID error:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Get rental items by user, gender, and category
const getRentalItemsByUserGenderCategory = async (req, res) => {
    try {
        const { uid, gender, category } = req.params;

        const [rentalItems] = await db.query(
            `SELECT r.*, i.item_name, i.item_category, i.gender, i.description
             FROM rental_items r
             JOIN items i ON r.item_id = i.iid
             WHERE i.user_id = ? AND i.gender = ? AND i.item_category = ?`,
            [uid, gender, category]
        );

        res.status(200).json(rentalItems);
    } catch (error) {
        console.error('Get rental items by user/gender/category error:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Get non-rental items by user, gender, and category
const getUnrentalItemsByUserGenderCategory = async (req, res) => {
    try {
        const { uid, gender, category } = req.params;

        const [items] = await db.query(
            `SELECT i.* 
             FROM items i
             LEFT JOIN rental_items r ON i.iid = r.item_id
             WHERE i.user_id = ? AND i.gender = ? AND i.item_category = ? AND r.iid IS NULL`,
            [uid, gender, category]
        );

        res.status(200).json(items);
    } catch (error) {
        console.error('Get unrental items error:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Create rental item
const createRentalItem = async (req, res) => {
    try {
        const {
            item_id,
            rental_price_by_days,
            currency,
            number_of_days
        } = req.body;

        if (!item_id || !rental_price_by_days || !currency) {
            return res.status(400).json({ message: 'Required fields are missing' });
        }

        const rentalId = uuidv4();

        await db.query(
            `INSERT INTO rental_items (iid, item_id, rental_price_by_days, currency, number_of_days) 
             VALUES (?, ?, ?, ?, ?)`,
            [rentalId, item_id, rental_price_by_days, currency, number_of_days || 1]
        );

        res.status(201).json({
            message: 'Rental item created successfully',
            rental: { iid: rentalId }
        });
    } catch (error) {
        console.error('Create rental item error:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Create multiple rental items (batch)
const createRentalItemsBatch = async (req, res) => {
    try {
        const rentalItems = req.body;

        if (!Array.isArray(rentalItems) || rentalItems.length === 0) {
            return res.status(400).json({ message: 'Rental items array is required' });
        }

        const insertPromises = rentalItems.map(rental => {
            const rentalId = uuidv4();
            
            return db.query(
                `INSERT INTO rental_items (iid, item_id, rental_price_by_days, currency, number_of_days) 
                 VALUES (?, ?, ?, ?, ?)`,
                [rentalId, rental.item_id, rental.rental_price_by_days, rental.currency, rental.number_of_days || 1]
            );
        });

        await Promise.all(insertPromises);

        res.status(201).json({ message: `${rentalItems.length} rental items created successfully` });
    } catch (error) {
        console.error('Create rental items batch error:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Update rental item
const updateRentalItem = async (req, res) => {
    try {
        const { rid } = req.params;
        const updateData = req.body;

        // Check if rental item exists
        const [rentalItems] = await db.query('SELECT * FROM rental_items WHERE iid = ?', [rid]);
        
        if (rentalItems.length === 0) {
            return res.status(404).json({ message: 'Rental item not found' });
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

        updateValues.push(rid);
        const updateQuery = `UPDATE rental_items SET ${updateFields.join(', ')} WHERE iid = ?`;

        await db.query(updateQuery, updateValues);

        res.status(200).json({ message: 'Rental item updated successfully' });
    } catch (error) {
        console.error('Update rental item error:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Delete rental item
const deleteRentalItem = async (req, res) => {
    try {
        const { rid } = req.params;

        const [result] = await db.query('DELETE FROM rental_items WHERE iid = ?', [rid]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Rental item not found' });
        }

        res.status(200).json({ message: 'Rental item deleted successfully' });
    } catch (error) {
        console.error('Delete rental item error:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

module.exports = {
    getAllRentalItems,
    getRentalItemById,
    getRentalItemsByUserGenderCategory,
    getUnrentalItemsByUserGenderCategory,
    createRentalItem,
    createRentalItemsBatch,
    updateRentalItem,
    deleteRentalItem
};
