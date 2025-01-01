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

const Home = () => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);

  // Fetch books by category or query
  const fetchBooks = async () => {
    setError('');
    setBooks([]);

    try {
      let res;
      if (selectedCategory) {
        // Fetch books by category
        res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/books/category/${selectedCategory}`);
      } else if (query.trim()) {
        // Fetch books by query
        res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/books/search`, {
          params: { q: query },
        });
      } else {
        // Default: Fetch popular books
        res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/books/category/Popular`);
      }

      setBooks(res.data.books);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch books.');
    }
  };

  // Handle search form submission
  const onSearch = async (e) => {
    e.preventDefault();
    setSelectedCategory(''); // Clear category selection when searching
    setIsSearchActive(true); // Mark search as active
    fetchBooks();
  };

  // Reset search to show categories
  const resetSearch = () => {
    setQuery('');
    setSelectedCategory('');
    setIsSearchActive(false);
    fetchBooks();
  };

  // Fetch books when category changes
  useEffect(() => {
    if (selectedCategory) {
      fetchBooks();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  // Fetch default books on initial load
  useEffect(() => {
    fetchBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-4 lg:p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-center">Search & Explore Books</h1>

      {/* Search Bar */}
      <form onSubmit={onSearch} className="flex mb-6 max-w-3xl mx-auto">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for books..."
          className="flex-grow px-4 py-2 border rounded-l"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600">
          Search
        </button>
      </form>

      {/* Reset Search Button */}
      {isSearchActive && (
        <div className="text-center mb-4">
          <button
            onClick={resetSearch}
            className="px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded"
          >
            Reset Search
          </button>
        </div>
      )}

      {/* Categories (Hidden during search) */}
      {!isSearchActive && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Categories</h2>
          <div className="flex flex-wrap justify-center">
            {categoriesList.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setQuery(''); // Clear search query when selecting a category
                  setSelectedCategory(category);
                }}
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
        </div>
      )}

      {/* Error Message */}
      {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}

      {/* Books Grid */}
      {books.length === 0 && !error && <div className="text-center">No books found.</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default Home;
