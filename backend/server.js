// backend/app.js
const express = require('express');
const cors = require('cors');
require('./config/dotenvConfig'); // Load environment variables
const mongoose = require('./db/database'); // MongoDB connection

const booksRouter = require('./routes/books');
const authRouter = require('./routes/auth');
const favoritesRoutes = require('./routes/favorites');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/books', booksRouter);
app.use('/api/auth', authRouter);
app.use('/api/favorites', favoritesRoutes); 


// Default route
app.get('/', (req, res) => {
    res.send('Welcome to the Google Books API Backend with Authentication!');
});

// Error handling middleware (optional)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
