// backend/routes/books.js
const express = require('express');
const { searchBooks, getBooksByCategory, getBookById } = require('../controllers/booksController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Protected route to search books by query
router.get('/search', protect, searchBooks);

// Protected route to get books by category
router.get('/category/:category', protect, getBooksByCategory);

// Protected route to get a single book by ID
router.get('/:id', protect, getBookById);

module.exports = router;
