const dotenv = require('dotenv');

dotenv.config();

if (!process.env.GOOGLE_BOOKS_API_KEY) {
    throw new Error('Missing required environment variable: GOOGLE_BOOKS_API_KEY');
}
