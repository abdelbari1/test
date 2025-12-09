const db = require('../config/database');
const { v4: uuidv4 } = require('uuid');

// Get sizes for an item
const getSizesByItem = async (req, res) => {
    try {
        const { iid } = req.params;

        const [sizes] = await db.query(
            'SELECT * FROM sizes WHERE item_id = ?',
            [iid]
        );

        res.status(200).json(sizes);
    } catch (error) {
        console.error('Get sizes by item error:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Create size
const createSize = async (req, res) => {
    try {
        const { size, quantity, item_id } = req.body;

        if (!size || quantity === undefined || !item_id) {
            return res.status(400).json({ message: 'size, quantity, and item_id are required' });
        }

        const sizeId = uuidv4();

        await db.query(
            'INSERT INTO sizes (iid, size, quantity, item_id) VALUES (?, ?, ?, ?)',
            [sizeId, size, quantity, item_id]
        );

        res.status(201).json({
            message: 'Size created successfully',
            size: { iid: sizeId, size, quantity }
        });
    } catch (error) {
        console.error('Create size error:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Update size
const updateSize = async (req, res) => {
    try {
        const { sid } = req.params;
        const updateData = req.body;

        // Check if size exists
        const [sizes] = await db.query('SELECT * FROM sizes WHERE iid = ?', [sid]);
        
        if (sizes.length === 0) {
            return res.status(404).json({ message: 'Size not found' });
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

        updateValues.push(sid);
        const updateQuery = `UPDATE sizes SET ${updateFields.join(', ')} WHERE iid = ?`;

        await db.query(updateQuery, updateValues);

        res.status(200).json({ message: 'Size updated successfully' });
    } catch (error) {
        console.error('Update size error:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Delete size
const deleteSize = async (req, res) => {
    try {
        const { sid } = req.params;

        const [result] = await db.query('DELETE FROM sizes WHERE iid = ?', [sid]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Size not found' });
        }

        res.status(200).json({ message: 'Size deleted successfully' });
    } catch (error) {
        console.error('Delete size error:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

module.exports = {
    getSizesByItem,
    createSize,
    updateSize,
    deleteSize
};
