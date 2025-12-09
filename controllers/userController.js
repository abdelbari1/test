const db = require('../config/database');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

// Get all users by role
const getUsersByRole = async (req, res) => {
    try {
        const { role } = req.query;
        
        if (!role) {
            return res.status(400).json({ message: 'Role parameter is required' });
        }

        const [users] = await db.query(
            'SELECT iid, first_name, last_name, email, user_role FROM users WHERE user_role = ?',
            [role]
        );

        res.status(200).json(users);
    } catch (error) {
        console.error('Get users by role error:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Create new user
const createUser = async (req, res) => {
    try {
        const { first_name, last_name, email, pwd, confirm_pwd, user_role } = req.body;

        if (!first_name || !last_name || !email || !pwd || !confirm_pwd) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (pwd !== confirm_pwd) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        // Check if user exists
        const [existingUsers] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        
        if (existingUsers.length > 0) {
            return res.status(409).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(pwd, 10);
        const userId = uuidv4();
        const role = user_role || 'user';

        await db.query(
            'INSERT INTO users (iid, first_name, last_name, email, pwd, confirm_pwd, user_role) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [userId, first_name, last_name, email, hashedPassword, hashedPassword, role]
        );

        res.status(201).json({
            message: 'User created successfully',
            user: {
                iid: userId,
                first_name,
                last_name,
                email,
                user_role: role
            }
        });
    } catch (error) {
        console.error('Create user error:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Update user
const updateUser = async (req, res) => {
    try {
        const { uid } = req.params;
        const { first_name, last_name, email, pwd, confirm_pwd, user_role } = req.body;

        // Check if user exists
        const [users] = await db.query('SELECT * FROM users WHERE iid = ?', [uid]);
        
        if (users.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        let updateQuery = 'UPDATE users SET ';
        const updateValues = [];
        const updateFields = [];

        if (first_name) {
            updateFields.push('first_name = ?');
            updateValues.push(first_name);
        }
        if (last_name) {
            updateFields.push('last_name = ?');
            updateValues.push(last_name);
        }
        if (email) {
            updateFields.push('email = ?');
            updateValues.push(email);
        }
        if (pwd && confirm_pwd) {
            if (pwd !== confirm_pwd) {
                return res.status(400).json({ message: 'Passwords do not match' });
            }
            const hashedPassword = await bcrypt.hash(pwd, 10);
            updateFields.push('pwd = ?, confirm_pwd = ?');
            updateValues.push(hashedPassword, hashedPassword);
        }
        if (user_role) {
            updateFields.push('user_role = ?');
            updateValues.push(user_role);
        }

        if (updateFields.length === 0) {
            return res.status(400).json({ message: 'No fields to update' });
        }

        updateQuery += updateFields.join(', ') + ' WHERE iid = ?';
        updateValues.push(uid);

        await db.query(updateQuery, updateValues);

        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        console.error('Update user error:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Delete user
const deleteUser = async (req, res) => {
    try {
        const { uid } = req.params;

        const [result] = await db.query('DELETE FROM users WHERE iid = ?', [uid]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Delete user error:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

module.exports = {
    getUsersByRole,
    createUser,
    updateUser,
    deleteUser
};
