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
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Google Books App
        </Link>
        <div>
          {auth.isAuthenticated ? (
            <>
              <Link to="/" className="mr-4 hover:text-gray-300">
                Home
              </Link>
              <Link to="/categories" className="mr-4 hover:text-gray-300">
                Categories
              </Link>
              <Link to="/favorites" className="mr-4 hover:text-gray-300">
                Favorites
              </Link>
              <button onClick={onLogout} className="hover:text-gray-300">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="mr-4 hover:text-gray-300">
                Login
              </Link>
              <Link to="/register" className="hover:text-gray-300">
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
