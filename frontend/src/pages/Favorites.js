// src/pages/Favorites.js
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import BookCard from '../components/BookCard';
import { AuthContext } from '../context/AuthContext';

const Favorites = () => {
  const { auth } = useContext(AuthContext);

  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState('');

  const fetchFavorites = async () => {
    if (!auth.token) {
      setFavorites([]);
      return;
    }

    setError('');
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/favorites`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      setFavorites(res.data.favorites);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch favorites.');
    }
  };

  // Toggle favorite status
  const toggleFavorite = async (bookId) => {
    if (!auth.token) {
      alert('You need to be logged in to manage favorites.');
      return;
    }

    try {
      if (favorites.some(book => book.id === bookId)) {
        // Remove from favorites
        await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/favorites/${bookId}`, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        setFavorites(favorites.filter(book => book.id !== bookId));
      } else {
        // Add to favorites
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/favorites`, { bookId }, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        // Optionally, fetch favorites again to ensure consistency
        fetchFavorites();
      }
    } catch (err) {
      console.error('Failed to toggle favorite status:', err);
      alert(err.response?.data?.error || 'Failed to update favorites.');
    }
  };

  useEffect(() => {
    fetchFavorites();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.token]);

  return (
    <div className="p-4 lg:p-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-center">My Favorites</h1>
      {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center">{error}</div>}
      {favorites.length === 0 && !error && <div className="text-center">You have no favorite books.</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {favorites.map(book => (
          <BookCard
            key={book.id}
            book={book}
            isFavorite={true}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
