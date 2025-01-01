import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import axios from 'axios';

const BookCard = ({ book }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  // Check if the book is in favorites
  useEffect(() => {
    const checkFavoriteStatus = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/favorites`);
        const isFav = res.data.favorites.some((favBook) => favBook.id === book.id);
        setIsFavorite(isFav);
      } catch (error) {
        console.error('Failed to fetch favorite status:', error);
      }
    };

    checkFavoriteStatus();
  }, [book.id]);

  // Toggle favorite status
  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/favorites/${book.id}`);
        setIsFavorite(false);
      } else {
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/favorites`, { bookId: book.id });
        setIsFavorite(true);
      }
    } catch (error) {
      console.error('Failed to toggle favorite status:', error);
    }
  };

  return (
    <div className="border rounded shadow hover:shadow-lg transition duration-200 relative">
      {/* Favorite Button */}
      <button
        className="absolute top-4 right-4 bg-white rounded-full p-2 shadow hover:shadow-md"
        onClick={toggleFavorite}
        title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      >
        {isFavorite ? (
          <AiFillHeart className="text-red-500 text-xl" />
        ) : (
          <AiOutlineHeart className="text-gray-400 text-xl" />
        )}
      </button>

      <Link to={`/book/${book.id}`}>
        {/* Book Thumbnail */}
        <img
          src={book.thumbnail}
          alt={book.title}
          className="w-full h-72 object-cover rounded-t"
        />
        <div className="p-4">
          {/* Book Title */}
          <h3 className="text-lg font-semibold mb-2">{book.title}</h3>

          {/* Authors */}
          <p className="text-gray-600 mb-2">{book.authors.join(', ')}</p>

          {/* Description */}
          <p className="text-gray-700 text-sm line-clamp-3">{book.description}</p>
        </div>
      </Link>
    </div>
  );
};

export default BookCard;
