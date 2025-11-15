const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
<<<<<<< HEAD
=======
const path = require('path');
>>>>>>> 719126d277a92baa5cf4543fa0aef718c73fe2db
const connectDB = require('./config/database');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
<<<<<<< HEAD
// Handle CORS for production and development
const allowedOrigins = process.env.CORS_ORIGIN 
    ? process.env.CORS_ORIGIN.split(',').map(origin => origin.trim())
    : ['http://localhost:3000'];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        // In development, allow all origins
        if (process.env.NODE_ENV !== 'production') {
            return callback(null, true);
        }
        
        // In production, check against allowed origins
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
=======
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
>>>>>>> 719126d277a92baa5cf4543fa0aef718c73fe2db
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to database
connectDB();

<<<<<<< HEAD
// Routes
=======
// Routes (API)
>>>>>>> 719126d277a92baa5cf4543fa0aef718c73fe2db
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks', require('./routes/tasks'));
app.use('/api/users', require('./routes/users'));

<<<<<<< HEAD
// Basic route for testing
app.get('/', (req, res) => {
    res.json({ message: 'Todo App API is running!' });
=======
// Serve frontend (React build)
const __dirname1 = path.resolve();
app.use(express.static(path.join(__dirname1, 'frontend', 'dist')));

// Catch-all route to serve React index.html for non-API routes
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname1, 'frontend', 'dist', 'index.html'));
>>>>>>> 719126d277a92baa5cf4543fa0aef718c73fe2db
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

<<<<<<< HEAD
// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 
=======
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
>>>>>>> 719126d277a92baa5cf4543fa0aef718c73fe2db
