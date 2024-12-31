// backend/controllers/favoritesController.js
const User = require('../models/user');
const { fetchBookByIdFromGoogleAPI } = require('../services/googleBooksService');
const { handleError } = require('../utils/errorHandler');

// Add a book to favorites
const addFavorite = async (req, res) => {
  const userId = req.user.id;
  const { bookId } = req.body;

  if (!bookId) {
    return res.status(400).json({ error: 'Please provide a book ID.' });
  }

  try {
    const user = await User.findById(userId);

    if (user.favorites.includes(bookId)) {
      return res.status(400).json({ error: 'Book is already in favorites.' });
    }

    // Optionally, verify if the book exists by fetching its details
    const book = await fetchBookByIdFromGoogleAPI(bookId);
    if (!book) {
      return res.status(404).json({ error: 'Book not found.' });
    }

    user.favorites.push(bookId);
    await user.save();

    res.status(200).json({ message: 'Book added to favorites.', favorites: user.favorites });
  } catch (error) {
    handleError(res, error);
  }
};

// Remove a book from favorites
const removeFavorite = async (req, res) => {
  const userId = req.user.id;
  const { bookId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user.favorites.includes(bookId)) {
      return res.status(400).json({ error: 'Book is not in favorites.' });
    }

    user.favorites = user.favorites.filter(id => id !== bookId);
    await user.save();

    res.status(200).json({ message: 'Book removed from favorites.', favorites: user.favorites });
  } catch (error) {
    handleError(res, error);
  }
};

// Get all favorite books for the authenticated user
const getFavorites = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);

    // Fetch detailed information for each favorite book
    const favoriteBooksPromises = user.favorites.map(bookId => fetchBookByIdFromGoogleAPI(bookId));
    const favoriteBooks = await Promise.all(favoriteBooksPromises);

    res.status(200).json({ favorites: favoriteBooks.filter(book => book !== null) });
  } catch (error) {
    handleError(res, error);
  }
};

module.exports = { addFavorite, removeFavorite, getFavorites };
