const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const itemRoutes = require('./routes/itemRoutes');
const sizeRoutes = require('./routes/sizeRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');
const deliveryRoutes = require('./routes/deliveryRoutes');
const purchaseRoutes = require('./routes/purchaseRoutes');
const rentalRoutes = require('./routes/rentalRoutes');
const unrentalRoutes = require('./routes/unrentalRoutes');
const bookedRoutes = require('./routes/bookedRoutes');

// API Routes
app.use('/fashion/api', authRoutes);
app.use('/fashion/api/users', userRoutes);
app.use('/fashion/api/items', itemRoutes);
app.use('/fashion/api/sizes', sizeRoutes);
app.use('/fashion/api/wishlists', wishlistRoutes);
app.use('/fashion/api/delivery', deliveryRoutes);
app.use('/fashion/api/purchases', purchaseRoutes);
app.use('/fashion/api/rental-items', rentalRoutes);
app.use('/fashion/api/unrental-items', unrentalRoutes);
app.use('/fashion/api/booked-items', bookedRoutes);

// Root route
// app.get('/', (req, res) => {
//     res.json({
//         message: 'Fashion API Server',
//         version: '1.0.0',
//         endpoints: {
//             auth: '/fashion/api/login',
//             users: '/fashion/api/users',
//             items: '/fashion/api/items',
//             sizes: '/fashion/api/sizes',
//             wishlists: '/fashion/api/wishlists',
//             delivery: '/fashion/api/delivery',
//             purchases: '/fashion/api/purchases',
//             rental_items: '/fashion/api/rental-items',
//             unrental_items: '/fashion/api/unrental-items',
//             booked_items: '/fashion/api/booked-items'
//         }
//     });
// });

// Health check route
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : {}
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`✓ Server is running on http://localhost:${PORT}`);
    // console.log(`✓ Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`✓ API Base URL: http://localhost:${PORT}/fashion/api`);
});

module.exports = app;
