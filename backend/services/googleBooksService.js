const axios = require('axios');

// Fetch books from Google Books API
const fetchBooksFromGoogleAPI = async (query) => {
    const API_KEY = process.env.GOOGLE_BOOKS_API_KEY;
    const API_URL = 'https://www.googleapis.com/books/v1/volumes';

    const response = await axios.get(API_URL, {
        params: {
            q: query,
            key: API_KEY,
            maxResults: 10,
        },
    });

    if (!response.data.items) {
        throw new Error('No books found for the given query.');
    }

    return response.data.items.map(item => ({
        id: item.id,
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors || ['Unknown Author'],
        description: item.volumeInfo.description || 'No description available.',
        thumbnail: item.volumeInfo.imageLinks?.thumbnail || 'No thumbnail available.',
        publisher: item.volumeInfo.publisher || 'Unknown Publisher',
    }));
};

module.exports = { fetchBooksFromGoogleAPI };
