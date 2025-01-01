// src/components/Navbar.js
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* App Title */}
        <Link to="/" className="text-2xl font-bold hover:text-gray-300">
          Google Books App
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-4">
          {auth.isAuthenticated ? (
            <>
              <Link
                to="/favorites"
                className="hover:text-gray-300 transition-colors duration-200"
              >
                Favorites
              </Link>
              <button
                onClick={onLogout}
                className="hover:text-gray-300 transition-colors duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hover:text-gray-300 transition-colors duration-200"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="hover:text-gray-300 transition-colors duration-200"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
