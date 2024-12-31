const handleError = (res, error) => {
    console.error('Error:', error.message || error);
    res.status(500).json({
        error: error.message || 'An unexpected error occurred.',
    });
};

module.exports = { handleError };
