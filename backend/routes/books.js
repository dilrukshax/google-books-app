const express = require('express');
const { searchBooks } = require('../controllers/booksController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Protected route to search books
router.get('/search', protect, searchBooks);

module.exports = router;
 