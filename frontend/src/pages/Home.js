// src/pages/Home.js
import React, { useState } from 'react';
import axios from 'axios';
import BookCard from '../components/BookCard';

const Home = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');

  const onSearch = async e => {
    e.preventDefault();
    setError('');
    setBooks([]);

    if (!query.trim()) {
      setError('Please enter a search query.');
      return;
    }

    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/books/search`, {
        params: { q: query },
      });
      setBooks(res.data.books);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch books.');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Search Books</h1>
      <form onSubmit={onSearch} className="flex mb-6">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search for books..."
          className="flex-grow px-4 py-2 border rounded-l"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600">
          Search
        </button>
      </form>
      {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map(book => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default Home;
