// src/pages/BookDetails.js
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const BookDetails = () => {
  const { id } = useParams();
  const { auth } = useContext(AuthContext);

  const [book, setBook] = useState(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const fetchBookDetails = async () => {
    setError('');
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/books/${id}`);
      setBook(res.data.book);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch book details.');
    }
  };

  useEffect(() => {
    fetchBookDetails();
    // eslint-disable-next-line
  }, [id]);

  const addToFavorites = async () => {
    setMessage('');
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/favorites`, { bookId: id });
      setMessage('Book added to favorites.');
    } catch (err) {
      setMessage(err.response?.data?.error || 'Failed to add to favorites.');
    }
  };

  if (error) {
    return <div className="bg-red-100 text-red-700 p-3 rounded">{error}</div>;
  }

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col md:flex-row">
      <img src={book.thumbnail} alt={book.title} className="w-48 h-auto mb-4 md:mb-0 md:mr-6" />
      <div>
        <h2 className="text-2xl font-bold mb-2">{book.title}</h2>
        <p className="text-gray-700 mb-2"><strong>Authors:</strong> {book.authors.join(', ')}</p>
        <p className="text-gray-700 mb-2"><strong>Publisher:</strong> {book.publisher}</p>
        <p className="text-gray-700 mb-2"><strong>Published Date:</strong> {book.publishedDate}</p>
        <p className="text-gray-700 mb-2"><strong>Page Count:</strong> {book.pageCount}</p>
        <p className="text-gray-700 mb-2"><strong>Categories:</strong> {book.categories.join(', ')}</p>
        <p className="text-gray-700 mb-4"><strong>Language:</strong> {book.language}</p>
        <p className="mb-4">{book.description}</p>
        <button
          onClick={addToFavorites}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add to Favorites
        </button>
        {message && <div className="mt-2 text-green-700">{message}</div>}
      </div>
    </div>
  );
};

export default BookDetails;
