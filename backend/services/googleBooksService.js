// backend/services/googleBooksService.js
const axios = require('axios');

// Fetch books from Google Books API based on a query
const fetchBooksFromGoogleAPI = async (query) => {
    const API_KEY = process.env.GOOGLE_BOOKS_API_KEY;
    const API_URL = 'https://www.googleapis.com/books/v1/volumes';

    const response = await axios.get(API_URL, {
        params: {
            q: query,
            key: API_KEY,
            maxResults: 40, // Fetch more results to have a better selection
        },
    });

    if (!response.data.items) {
        return []; // Return empty array if no books found
    }

    return response.data.items.map(item => ({
        id: item.id,
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors || ['Unknown Author'],
        description: item.volumeInfo.description || 'No description available.',
        thumbnail: item.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/128x195?text=No+Image',
        publisher: item.volumeInfo.publisher || 'Unknown Publisher',
        publishedDate: item.volumeInfo.publishedDate || 'N/A',
        pageCount: item.volumeInfo.pageCount || 'N/A',
        categories: item.volumeInfo.categories || ['Uncategorized'],
        language: item.volumeInfo.language || 'N/A',
        // Add more fields as needed
    }));
};

// Fetch a single book by ID from Google Books API
const fetchBookByIdFromGoogleAPI = async (bookId) => {
    const API_KEY = process.env.GOOGLE_BOOKS_API_KEY;
    const API_URL = `https://www.googleapis.com/books/v1/volumes/${bookId}`;

    const response = await axios.get(API_URL, {
        params: {
            key: API_KEY,
        },
    });

    if (!response.data) {
        return null;
    }

    const item = response.data;

    return {
        id: item.id,
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors || ['Unknown Author'],
        description: item.volumeInfo.description || 'No description available.',
        thumbnail: item.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/128x195?text=No+Image',
        publisher: item.volumeInfo.publisher || 'Unknown Publisher',
        publishedDate: item.volumeInfo.publishedDate || 'N/A',
        pageCount: item.volumeInfo.pageCount || 'N/A',
        categories: item.volumeInfo.categories || ['Uncategorized'],
        language: item.volumeInfo.language || 'N/A',
        // Add more fields as needed
    };
};

module.exports = { fetchBooksFromGoogleAPI, fetchBookByIdFromGoogleAPI };
