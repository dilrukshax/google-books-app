// frontend/src/pages/Home.js
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import BookCard from '../components/BookCard';
import { AuthContext } from '../context/AuthContext';
import { FiRefreshCw } from 'react-icons/fi'; // Importing a refresh icon for reset
import illustration1 from '../assets/illustration1.svg';
import illustration2 from '../assets/illustration2.svg';

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
  const { auth } = useContext(AuthContext);

  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [books, setBooks] = useState([]);
  const [favorites, setFavorites] = useState([]); // Store favorite book IDs
  const [error, setError] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const booksPerPage = 10; // Number of books to display

  // Fetch books by category or query
  const fetchBooks = async () => {
    setError('');
    setBooks([]);
    setLoading(true); // Start loading

    try {
      let res;
      if (selectedCategory) {
        // Fetch books by category
        res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/books/category/${selectedCategory}`, {
          headers: auth.token ? { Authorization: `Bearer ${auth.token}` } : {},
        });
      } else if (query.trim()) {
        // Fetch books by query
        res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/books/search`, {
          params: { q: query },
          headers: auth.token ? { Authorization: `Bearer ${auth.token}` } : {},
        });
      } else {
        // Default: Fetch popular books
        res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/books/category/Popular`, {
          headers: auth.token ? { Authorization: `Bearer ${auth.token}` } : {},
        });
      }

      // Limit the number of books to display
      const limitedBooks = res.data.books.slice(0, booksPerPage);
      setBooks(limitedBooks);
    } catch (err) {
      console.error('Error fetching books:', err);
      setError(err.response?.data?.error || 'Failed to fetch books.');
    } finally {
      setLoading(false); // End loading
    }
  };

  // Fetch user's favorites
  const fetchFavorites = async () => {
    if (!auth.token) {
      setFavorites([]);
      return;
    }

    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/favorites`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      const favoriteIds = res.data.favorites.map((book) => book.id);
      setFavorites(favoriteIds);
    } catch (err) {
      console.error('Error fetching favorites:', err);
      // Optionally set an error state
    }
  };

  // Toggle favorite status
  const toggleFavorite = async (bookId) => {
    if (!auth.token) {
      alert('You need to be logged in to manage favorites.');
      return;
    }

    try {
      if (favorites.includes(bookId)) {
        // Remove from favorites
        await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/favorites/${bookId}`, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        setFavorites(favorites.filter(id => id !== bookId));
      } else {
        // Add to favorites
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/favorites`, { bookId }, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        setFavorites([...favorites, bookId]);
      }
    } catch (err) {
      console.error('Failed to toggle favorite status:', err);
      alert(err.response?.data?.error || 'Failed to update favorites.');
    }
  };

  // Handle search form submission
  const onSearch = async (e) => {
    e.preventDefault();
    setSelectedCategory(''); // Clear category selection when searching
    setIsSearchActive(true); // Mark search as active
    fetchBooks();
    if (auth.token) {
      fetchFavorites();
    }
  };

  // Reset search to show categories
  const resetSearch = () => {
    setQuery('');
    setSelectedCategory('');
    setIsSearchActive(false);
    fetchBooks();
    if (auth.token) {
      fetchFavorites();
    }
  };

  // Fetch books when category changes
  useEffect(() => {
    if (selectedCategory) {
      setQuery(''); // Clear search query when selecting a category
      setIsSearchActive(false); // Disable search
      fetchBooks();
      if (auth.token) {
        fetchFavorites();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  // Fetch default books and favorites on initial load and when auth.token changes
  useEffect(() => {
    fetchBooks();
    if (auth.token) {
      fetchFavorites();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.token]);

  return (
    <div>


      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-600 text-white">
        <div className="container mx-auto flex flex-col lg:flex-row items-center py-12">
          <div className="w-full lg:w-3/4 lg:pr-12 p-10">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Find Your Next Adventure</h1>
            <p className="text-lg mb-6">
              Explore a world of stories, knowledge, and imagination. Discover books that inspire and entertain you.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-3">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search books by title, author, or keyword"
                className="flex-grow px-4 py-3 rounded-lg focus:outline-none text-gray-800 focus:ring-2 focus:ring-blue-300"
              />
              <button
                onClick={fetchBooks}
                className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 shadow-md"
              >
                Search
              </button>
            </form>
          </div>
          <img src={illustration1} alt="Hero Illustration" className="w-80 lg:w-96" />
        </div>
      </section>

      {/* Search Bar
      <form onSubmit={onSearch} className="flex mb-6 max-w-3xl mx-auto">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for books by title, author, or keyword..."
          className="flex-grow px-6 py-3 border border-gray-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-r-full hover:bg-blue-700 transition duration-200 flex items-center justify-center"
        >
          Search
        </button>
      </form>
  */}
      {/* Reset Search Button */}
      {isSearchActive && (
        <div className="text-center mb-6">
          <button
            onClick={resetSearch}
            className="flex items-center justify-center px-5 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-full transition duration-200 mx-auto"
          >
            <FiRefreshCw className="mr-2" /> Reset Search
          </button>
        </div>
      )}
      <div className="p-4 lg:p-8 min-h-screen">

        {/* Categories (Hidden during search) */}
        {!isSearchActive && (
          <div className="mb-12">
            <h2 className="text-3xl font-semibold mb-6 text-center text-blue-700">Browse by Categories</h2>
            <div className="flex flex-wrap justify-center gap-6">
              {categoriesList.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full text-lg font-medium transition-all ease-in-out duration-300 
            ${selectedCategory === category
                      ? 'bg-blue-600 text-white border-blue-600 transform scale-105'
                      : 'bg-white text-gray-700 border-2 border-gray-300 hover:bg-blue-50 hover:text-blue-600'}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        )}


        {/* Error Message */}
        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded mb-6 max-w-3xl mx-auto text-center">
            {error}
          </div>
        )}

        {/* Loading Indicator */}
        {loading && (
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          </div>
        )}

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              isFavorite={favorites.includes(book.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      </div>
      {/* Call to Action */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-600 text-white py-12">
        <div className="container mx-auto flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-3/4 lg:pr-12 p-10">
            <h3 className="text-3xl font-bold mb-4">Join Our Community of Book Lovers</h3>
            <p className="text-lg mb-6">
              Save your favorite books, share reviews, and connect with fellow readers around the world.
            </p>
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-100 shadow-md">
              Get Started
            </button>
          </div>
          <img src={illustration2} alt="Community Illustration" className="w-80 lg:w-96" />
        </div>
      </section>
    </div>
  );
};

export default Home;
