const db = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

const login = async (req, res) => {
    try {        
        console.log('%%%%%%%%%%%%%%5')
        const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
        const [email, password] = credentials.split(':');

        console.log('############# ', email)
            
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        const user = users[0];
        const isPasswordValid = await bcrypt.compare(password, user.pwd);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        res.status(200).json({
            message: 'Login successful',
            user: {
                iid: user.iid,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                user_role: user.user_role
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Register new user
const register = async (req, res) => {
    try {
        console.log('$$$$$$$$$$$$$$$$')
        const { first_name, last_name, email, pwd, confirm_pwd, user_role } = req.body

        if (!first_name || !last_name || !email || !pwd || !confirm_pwd) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (pwd !== confirm_pwd) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

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
            message: 'User registered successfully',
            user: {
                iid: userId,
                first_name,
                last_name,
                email,
                user_role: role
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

module.exports = {
    login,
    register
};
