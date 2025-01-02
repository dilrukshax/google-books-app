// backend/services/googleBooksService.js
const axios = require('axios');
const axiosRetry = require('axios-retry');
const NodeCache = require('node-cache');

// Initialize cache with a TTL of 1 hour
const cache = new NodeCache({ stdTTL: 3600 });

// Configure axios-retry to handle 429 errors
axiosRetry(axios, {
    retries: 5, // Number of retry attempts
    retryDelay: (retryCount, error) => {
        if (error.response && error.response.headers['retry-after']) {
            // Respect the Retry-After header from the API
            const retryAfter = parseInt(error.response.headers['retry-after'], 10);
            return retryAfter * 1000; // Convert to milliseconds
        }
        // Exponential backoff
        return axiosRetry.exponentialDelay(retryCount);
    },
    retryCondition: (error) => {
        // Retry on network errors or 429 status code
        return axiosRetry.isNetworkOrIdempotentRequestError(error) || error.response.status === 429;
    },
});

// Fetch books from Google Books API based on a query
const fetchBooksFromGoogleAPI = async (query) => {
    const cachedBooks = cache.get(`search_${query}`);
    if (cachedBooks) {
        return cachedBooks;
    }

    const API_KEY = process.env.GOOGLE_BOOKS_API_KEY;
    const API_URL = 'https://www.googleapis.com/books/v1/volumes';

    try {
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

        const books = response.data.items.map(item => ({
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

        // Cache the results
        cache.set(`search_${query}`, books);

        return books;
    } catch (error) {
        if (error.response && error.response.status === 429) {
            throw new Error('Rate limit exceeded. Please try again later.');
        }
        throw error;
    }
};

// Fetch a single book by ID from Google Books API
const fetchBookByIdFromGoogleAPI = async (bookId) => {
    const cachedBook = cache.get(`book_${bookId}`);
    if (cachedBook) {
        return cachedBook;
    }

    const API_KEY = process.env.GOOGLE_BOOKS_API_KEY;
    const API_URL = `https://www.googleapis.com/books/v1/volumes/${bookId}`;

    try {
        const response = await axios.get(API_URL, {
            params: {
                key: API_KEY,
            },
        });

        if (!response.data) {
            return null;
        }

        const item = response.data;

        const book = {
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

        // Cache the result
        cache.set(`book_${bookId}`, book);

        return book;
    } catch (error) {
        if (error.response && error.response.status === 429) {
            throw new Error('Rate limit exceeded. Please try again later.');
        }
        throw error;
    }
};

module.exports = { fetchBooksFromGoogleAPI, fetchBookByIdFromGoogleAPI };
