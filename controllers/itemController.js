const db = require('../config/database');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs').promises;
const path = require('path');

// Get all items
const getAllItems = async (req, res) => {
    try {
        const [items] = await db.query('SELECT * FROM items');
        res.status(200).json(items);
    } catch (error) {
        console.error('Get all items error:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Get item by ID
const getItemById = async (req, res) => {
    try {
        const { iid } = req.params;
        const [items] = await db.query('SELECT * FROM items WHERE iid = ?', [iid]);
        
        if (items.length === 0) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.status(200).json(items[0]);
    } catch (error) {
        console.error('Get item by ID error:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Get items by gender
const getItemsByGender = async (req, res) => {
    try {
        const { gender } = req.params;
        const [items] = await db.query('SELECT * FROM items WHERE gender = ?', [gender]);
        res.status(200).json(items);
    } catch (error) {
        console.error('Get items by gender error:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Get items by category
const getItemsByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const [items] = await db.query('SELECT * FROM items WHERE item_category = ?', [category]);
        res.status(200).json(items);
    } catch (error) {
        console.error('Get items by category error:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Get items by gender and category
const getItemsByGenderAndCategory = async (req, res) => {
    try {
        const { gender, category } = req.params;
        const [items] = await db.query(
            'SELECT * FROM items WHERE gender = ? AND item_category = ?',
            [gender, category]
        );
        res.status(200).json(items);
    } catch (error) {
        console.error('Get items by gender and category error:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Get items by user
const getItemsByUser = async (req, res) => {
    try {
        const { uid } = req.params;
        const [items] = await db.query('SELECT * FROM items WHERE user_id = ?', [uid]);
        res.status(200).json(items);
    } catch (error) {
        console.error('Get items by user error:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Get item image
const getItemImage = async (req, res) => {
    try {
        const { img } = req.query;
        
        if (!img) {
            return res.status(400).json({ message: 'Image parameter is required' });
        }

        const imagePath = path.join(__dirname, '../uploads', img);
        
        try {
            await fs.access(imagePath);
            res.sendFile(imagePath);
        } catch (err) {
            res.status(404).json({ message: 'Image not found' });
        }
    } catch (error) {
        console.error('Get item image error:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Create item
const createItem = async (req, res) => {
    try {
        const {
            item_name,
            item_category,
            gender,
            quantity,
            item_model,
            actual_price,
            currency,
            edited_price,
            flash_sale,
            status_item,
            description,
            reference,
            user_id
        } = req.body;

        if (!item_name || !item_category || !gender || !actual_price || !currency) {
            return res.status(400).json({ message: 'Required fields are missing' });
        }

        const itemId = uuidv4();
        const itemCreated = new Date();

        await db.query(
            `INSERT INTO items (iid, item_name, item_category, gender, quantity, item_model, 
             actual_price, currency, edited_price, flash_sale, status_item, description, 
             reference, item_created, user_id) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                itemId, item_name, item_category, gender, quantity || 0, item_model,
                actual_price, currency, edited_price, flash_sale, status_item,
                description, reference, itemCreated, user_id
            ]
        );

        res.status(201).json({
            message: 'Item created successfully',
            item: { iid: itemId, item_name, item_category, gender }
        });
    } catch (error) {
        console.error('Create item error:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Create multiple items (batch)
const createItemsBatch = async (req, res) => {
    try {
        const items = req.body;

        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: 'Items array is required' });
        }

        const insertPromises = items.map(item => {
            const itemId = uuidv4();
            const itemCreated = new Date();
            
            return db.query(
                `INSERT INTO items (iid, item_name, item_category, gender, quantity, item_model, 
                 actual_price, currency, edited_price, flash_sale, status_item, description, 
                 reference, item_created, user_id) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    itemId, item.item_name, item.item_category, item.gender, 
                    item.quantity || 0, item.item_model, item.actual_price, item.currency,
                    item.edited_price, item.flash_sale, item.status_item,
                    item.description, item.reference, itemCreated, item.user_id
                ]
            );
        });

        await Promise.all(insertPromises);

        res.status(201).json({ message: `${items.length} items created successfully` });
    } catch (error) {
        console.error('Create items batch error:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Update item
const updateItem = async (req, res) => {
    try {
        const { iid } = req.params;
        const updateData = req.body;

        // Check if item exists
        const [items] = await db.query('SELECT * FROM items WHERE iid = ?', [iid]);
        
        if (items.length === 0) {
            return res.status(404).json({ message: 'Item not found' });
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

        updateValues.push(iid);
        const updateQuery = `UPDATE items SET ${updateFields.join(', ')} WHERE iid = ?`;

        await db.query(updateQuery, updateValues);

        res.status(200).json({ message: 'Item updated successfully' });
    } catch (error) {
        console.error('Update item error:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Delete item
const deleteItem = async (req, res) => {
    try {
        const { iid } = req.params;

        const [result] = await db.query('DELETE FROM items WHERE iid = ?', [iid]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
        console.error('Delete item error:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Delete multiple items
const deleteItems = async (req, res) => {
    try {
        const itemIds = req.body;

        if (!Array.isArray(itemIds) || itemIds.length === 0) {
            return res.status(400).json({ message: 'Item IDs array is required' });
        }

        const placeholders = itemIds.map(() => '?').join(',');
        const [result] = await db.query(
            `DELETE FROM items WHERE iid IN (${placeholders})`,
            itemIds
        );

        res.status(200).json({ 
            message: `${result.affectedRows} items deleted successfully`,
            deletedCount: result.affectedRows
        });
    } catch (error) {
        console.error('Delete items error:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

module.exports = {
    getAllItems,
    getItemById,
    getItemsByGender,
    getItemsByCategory,
    getItemsByGenderAndCategory,
    getItemsByUser,
    getItemImage,
    createItem,
    createItemsBatch,
    updateItem,
    deleteItem,
    deleteItems
};
