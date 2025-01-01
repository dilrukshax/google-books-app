import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'; // Import favorite icons

const BookDetails = () => {
  const { id } = useParams();
  const { auth } = useContext(AuthContext);

  const [book, setBook] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false); // Track favorite status
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const fetchBookDetails = async () => {
    setError('');
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/books/${id}`);
      setBook(res.data.book);

      // Check if the book is already in the user's favorites
      const favoritesRes = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/favorites`);
      const isFav = favoritesRes.data.favorites.some((favBook) => favBook.id === id);
      setIsFavorite(isFav);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch book details.');
    }
  };

  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        // Remove from favorites
        await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/favorites/${id}`);
        setIsFavorite(false);
        setMessage('Removed from favorites.');
      } else {
        // Add to favorites
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/favorites`, { bookId: id });
        setIsFavorite(true);
        setMessage('Added to favorites.');
      }
    } catch (err) {
      setMessage(err.response?.data?.error || 'Failed to update favorites.');
    }
  };

  useEffect(() => {
    fetchBookDetails();
    // eslint-disable-next-line
  }, [id]);

  if (error) {
    return <div className="bg-red-100 text-red-700 p-3 rounded">{error}</div>;
  }

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-5xl relative">
        {/* Favorite Icon */}
        <div
          className="absolute top-4 right-4 cursor-pointer"
          onClick={toggleFavorite}
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite ? (
            <AiFillHeart className="text-red-500 text-2xl" />
          ) : (
            <AiOutlineHeart className="text-gray-400 text-2xl" />
          )}
        </div>

        <div className="flex flex-col md:flex-row">
          {/* Book Thumbnail */}
          <img
            src={book.thumbnail}
            alt={book.title}
            className="w-48 h-72 object-cover mb-4 md:mb-0 md:mr-6 rounded-lg"
          />
          <div>
            <h2 className="text-2xl font-bold mb-4">{book.title}</h2>
            <p className="text-gray-700 mb-2">
              <strong>Authors:</strong> {book.authors.join(', ')}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Publisher:</strong> {book.publisher}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Published Date:</strong> {book.publishedDate}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Page Count:</strong> {book.pageCount}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Categories:</strong> {book.categories.join(', ')}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Language:</strong> {book.language}
            </p>
            <p className="text-gray-600 mb-4">{book.description}</p>
            <button
              onClick={toggleFavorite}
              className={`px-4 py-2 rounded ${
                isFavorite ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-green-500 text-white hover:bg-green-600'
              }`}
            >
              {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
            {message && <div className="mt-2 text-green-700">{message}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
