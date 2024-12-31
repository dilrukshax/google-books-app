// backend/routes/favorites.js
const express = require('express');
const { addFavorite, removeFavorite, getFavorites } = require('../controllers/favoritesController');
const { protect } = require('../middleware/authMiddleware'); // Middleware to protect routes

const router = express.Router();

// Add a book to favorites
router.post('/', protect, addFavorite);

// Remove a book from favorites
router.delete('/:bookId', protect, removeFavorite);

// Get all favorite books for the authenticated user
router.get('/', protect, getFavorites);

module.exports = router;
