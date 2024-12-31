const express = require('express');
const cors = require('cors');
require('./config/dotenvConfig'); // Load environment variables
const mongoose = require('./db/database'); // MongoDB connection

const booksRouter = require('./routes/books');
const authRouter = require('./routes/auth');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/books', booksRouter);
app.use('/api/auth', authRouter);

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to the Google Books API Backend with Authentication!');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
