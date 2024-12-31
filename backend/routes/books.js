const express = require('express');
const { searchBooks } = require('../controllers/booksController');

const router = express.Router();

// Route to search books
router.get('/search', searchBooks);

module.exports = router;
