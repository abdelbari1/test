const db = require('../config/database');
const { v4: uuidv4 } = require('uuid');

// Get delivery addresses by user
const getDeliveryByUser = async (req, res) => {
    try {
        const { uid } = req.params;

        const [deliveries] = await db.query(
            'SELECT * FROM deliveries WHERE user_id = ?',
            [uid]
        );

        res.status(200).json(deliveries);
    } catch (error) {
        console.error('Get delivery by user error:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Create delivery address
const createDelivery = async (req, res) => {
    try {
        const {
            region,
            addrs,
            appartment,
            city,
            postcode,
            phone,
            save_address,
            user_id
        } = req.body;

        if (!region || !addrs || !appartment || !city || !phone || save_address === undefined || !user_id) {
            return res.status(400).json({ message: 'Required fields are missing' });
        }

        const deliveryId = uuidv4();

        await db.query(
            `INSERT INTO deliveries (iid, region, addrs, appartment, city, postcode, phone, save_address, user_id) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [deliveryId, region, addrs, appartment, city, postcode, phone, save_address, user_id]
        );

        res.status(201).json({
            message: 'Delivery address created successfully',
            delivery: { iid: deliveryId }
        });
    } catch (error) {
        console.error('Create delivery error:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Update delivery address
const updateDelivery = async (req, res) => {
    try {
        const { did } = req.params;
        const updateData = req.body;

        // Check if delivery exists
        const [deliveries] = await db.query('SELECT * FROM deliveries WHERE iid = ?', [did]);
        
        if (deliveries.length === 0) {
            return res.status(404).json({ message: 'Delivery address not found' });
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

        updateValues.push(did);
        const updateQuery = `UPDATE deliveries SET ${updateFields.join(', ')} WHERE iid = ?`;

        await db.query(updateQuery, updateValues);

        res.status(200).json({ message: 'Delivery address updated successfully' });
    } catch (error) {
        console.error('Update delivery error:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Delete delivery address
const deleteDelivery = async (req, res) => {
    try {
        const { did } = req.params;

        const [result] = await db.query('DELETE FROM deliveries WHERE iid = ?', [did]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Delivery address not found' });
        }

        res.status(200).json({ message: 'Delivery address deleted successfully' });
    } catch (error) {
        console.error('Delete delivery error:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

module.exports = {
    getDeliveryByUser,
    createDelivery,
    updateDelivery,
    deleteDelivery
};
