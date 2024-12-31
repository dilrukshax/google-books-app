// backend/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true,
        trim: true,
    },
    password: { 
        type: String, 
        required: true,
    },
    favorites: [
        {
            type: String, // Assuming book IDs are strings from Google Books API
            ref: 'Book',   // Optional: Reference to a Book model if you have one
        },
    ],
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
});

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Method to add a book to favorites
userSchema.methods.addFavorite = function (bookId) {
    if (!this.favorites.includes(bookId)) {
        this.favorites.push(bookId);
    }
    return this.save();
};

// Method to remove a book from favorites
userSchema.methods.removeFavorite = function (bookId) {
    this.favorites = this.favorites.filter(id => id !== bookId);
    return this.save();
};

module.exports = mongoose.model('User', userSchema);
