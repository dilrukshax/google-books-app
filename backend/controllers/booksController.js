const { fetchBooksFromGoogleAPI } = require('../services/googleBooksService');
const { handleError } = require('../utils/errorHandler');

// Controller for searching books
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

module.exports = { searchBooks };
