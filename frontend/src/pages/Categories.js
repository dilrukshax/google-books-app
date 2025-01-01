// src/pages/Categories.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from '../components/BookCard';

const categoriesList = [
  'Popular',
  'Science-Fiction',
  'Fantasy',
  'History',
  'Romance',
  'Mystery',
  'Non-Fiction',
  // Add more categories as needed
];

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState('Popular');
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');

  const fetchCategoryBooks = async (category) => {
    setError('');
    setBooks([]);

    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/books/category/${category}`);
      setBooks(res.data.books);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch books.');
    }
  };

  useEffect(() => {
    fetchCategoryBooks(selectedCategory);
  }, [selectedCategory]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Categories</h1>
      <div className="flex flex-wrap mb-6">
        {categoriesList.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`mr-2 mb-2 px-4 py-2 rounded ${
              selectedCategory === category
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
      {books.length === 0 && !error && <div>No books found for this category.</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map(book => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default Categories;
