// src/pages/Favorites.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from '../components/BookCard';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState('');

  const fetchFavorites = async () => {
    setError('');
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/favorites`);
      setFavorites(res.data.favorites);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch favorites.');
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">My Favorites</h1>
      {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
      {favorites.length === 0 && !error && <div>You have no favorite books.</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favorites.map(book => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
