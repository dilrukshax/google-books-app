import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

const BookDetails = () => {
  const { id } = useParams();
  const { auth } = useContext(AuthContext);

  const [book, setBook] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false); // Track favorite status
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const fetchBookDetails = async () => {
    setError('');
    setMessage('');
    try {
      // Fetch book details
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/books/${id}`, {
        headers: auth.token ? { Authorization: `Bearer ${auth.token}` } : {},
      });
      setBook(res.data.book);

      if (auth.token) {
        // Check if the book is already in the user's favorites
        const favoritesRes = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/favorites`, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        const isFav = favoritesRes.data.favorites.some((favBook) => favBook.id === id);
        setIsFavorite(isFav);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch book details.');
    }
  };

  const toggleFavorite = async () => {
    if (!auth.token) {
      alert('You need to be logged in to manage favorites.');
      return;
    }

    try {
      if (isFavorite) {
        // Remove from favorites
        await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/favorites/${id}`, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        setIsFavorite(false);
        setMessage('Removed from favorites.');
      } else {
        // Add to favorites
        await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/favorites`,
          { bookId: id },
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        setIsFavorite(true);
        setMessage('Added to favorites.');
      }
    } catch (err) {
      setMessage(err.response?.data?.error || 'Failed to update favorites.');
    }
  };

  useEffect(() => {
    fetchBookDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, auth.token]);

  if (error) {
    return <div className="bg-red-100 text-red-700 p-3 rounded text-center">{error}</div>;
  }

  if (!book) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-200 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl relative">
        {/* Favorite Icon */}
        <div
          className="absolute top-4 right-4 cursor-pointer"
          onClick={toggleFavorite}
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite ? (
            <AiFillHeart className="text-red-500 text-3xl" />
          ) : (
            <AiOutlineHeart className="text-gray-400 text-3xl" />
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Book Thumbnail */}
          <div className="w-full md:w-1/3">
            <img
              src={book.thumbnail}
              alt={book.title}
              className="w-full h-auto object-cover rounded-lg shadow-md"
            />
          </div>

          {/* Book Details */}
          <div className="w-full md:w-2/3">
            <h2 className="text-3xl font-bold mb-4">{book.title}</h2>
            <p className="text-gray-700 mb-3">
              <strong>Authors:</strong> {book.authors.join(', ')}
            </p>
            <p className="text-gray-700 mb-3">
              <strong>Publisher:</strong> {book.publisher}
            </p>
            <p className="text-gray-700 mb-3">
              <strong>Published Date:</strong> {book.publishedDate}
            </p>
            <p className="text-gray-700 mb-3">
              <strong>Page Count:</strong> {book.pageCount}
            </p>
            <p className="text-gray-700 mb-3">
              <strong>Categories:</strong> {book.categories.join(', ')}
            </p>
            <p className="text-gray-700 mb-3">
              <strong>Language:</strong> {book.language}
            </p>
            <p className="text-gray-600 mb-6">{book.description}</p>

            <button
              onClick={toggleFavorite}
              className={`px-6 py-3 rounded-md text-white ${
                isFavorite
                  ? 'bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300'
                  : 'bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300'
              } transition duration-300`}
            >
              {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>

            {message && (
              <div className="mt-3 text-green-700 text-center">{message}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
