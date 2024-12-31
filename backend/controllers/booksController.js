// backend/controllers/booksController.js
const { fetchBooksFromGoogleAPI, fetchBookByIdFromGoogleAPI } = require('../services/googleBooksService');
const { handleError } = require('../utils/errorHandler');

// Controller for searching books by query
const searchBooks = async (req, res) => {
    const query = req.query.q;

    if (!query) {
        return res.status(400).json({ error: 'Please provide a search query.' });
    }

    try {
        const books = await fetchBooksFromGoogleAPI(query);
        res.json({ books });
    } catch (error) {
        handleError(res, error);
    }
};

// Controller for getting books by category
const getBooksByCategory = async (req, res) => {
    const category = req.params.category;

    if (!category) {
        return res.status(400).json({ error: 'Please provide a category.' });
    }

    try {
        const query = mapCategoryToQuery(category);
        const books = await fetchBooksFromGoogleAPI(query);
        res.json({ books });
    } catch (error) {
        // Instead of throwing an error, return an empty array
        res.json({ books: [] });
    }
};

// Controller for getting a single book by ID
const getBookById = async (req, res) => {
    const bookId = req.params.id;

    if (!bookId) {
        return res.status(400).json({ error: 'Please provide a book ID.' });
    }

    try {
        const book = await fetchBookByIdFromGoogleAPI(bookId);
        if (!book) {
            return res.status(404).json({ error: 'Book not found.' });
        }
        res.json({ book });
    } catch (error) {
        handleError(res, error);
    }
};

// Helper function to map category to Google Books API query
const mapCategoryToQuery = (category) => {
    const categoryMap = {
        'popular': 'bestsellers',
        'science-fiction': 'subject:science fiction',
        'fantasy': 'subject:fantasy',
        'history': 'subject:history',
        'romance': 'subject:romance',
        'mystery': 'subject:mystery',
        'non-fiction': 'subject:non-fiction',
        // Add more categories as needed
    };

    const mappedQuery = categoryMap[category.toLowerCase()];

    if (!mappedQuery) {
        throw new Error('Invalid category.');
    }

    return mappedQuery;
};

module.exports = { searchBooks, getBooksByCategory, getBookById };
