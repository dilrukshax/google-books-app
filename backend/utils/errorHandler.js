// backend/utils/errorHandler.js
const handleError = (res, error) => {
    console.error('Error:', error.message || error);
    if (error.message.includes('Rate limit exceeded')) {
        res.status(429).json({
            error: 'Rate limit exceeded. Please try again later.',
        });
    } else {
        res.status(500).json({
            error: error.message || 'An unexpected error occurred.',
        });
    }
};

module.exports = { handleError };
