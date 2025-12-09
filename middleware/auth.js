const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Verify JWT token
const verifyToken = (req, res, next) => {
    console.log('################ $$$$$$$$$$$$$')
    const token = req.headers['authorization']?.split(' ')[1] || req.headers['x-access-token'];
    
    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }
        req.userId = decoded.id;
        req.userRole = decoded.role;
        next();
    });
};

// Check if user is admin
const isAdmin = (req, res, next) => {
    console.log('################ admin')
    if (req.userRole !== 'admin') {
        return res.status(403).json({ message: 'Require Admin Role' });
    }
    next();
};

// Check if user is owner or admin
const isOwnerOrAdmin = (req, res, next) => {
    console.log('################ $')
    const resourceUserId = req.params.uid || req.params.id;
    
    if (req.userRole === 'admin' || req.userId === resourceUserId) {
        next();
    } else {
        return res.status(403).json({ message: 'Access denied' });
    }
};

module.exports = {
    verifyToken,
    isAdmin,
    isOwnerOrAdmin
};
