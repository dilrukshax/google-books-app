// backend/models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
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
  // Existing fields...
  
  // Add the favorites field
  favorites: [
    {
      type: String, // Assuming book IDs are strings from Google Books API
    },
  ],
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', UserSchema);
