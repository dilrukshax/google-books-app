import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const onLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* App Title */}
        <Link to="/" className="text-3xl font-bold hover:text-blue-400">
          Google Books
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className="hover:text-blue-400 transition duration-300 font-medium"
          >
            Home
          </Link>
          {auth.isAuthenticated && (
            <Link
              to="/favorites"
              className="hover:text-blue-400 transition duration-300 font-medium"
            >
              Favorites
            </Link>
          )}
          {auth.isAuthenticated ? (
            <Link
              to="#"
              onClick={onLogout}
              className="hover:text-blue-400 transition duration-300 font-medium"
            >
              Logout
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="hover:text-blue-400 transition duration-300 font-medium"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="hover:text-blue-400 transition duration-300 font-medium"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Navigation */}
        <div
          onClick={toggleMobileMenu}
          className="md:hidden text-2xl cursor-pointer"
        >
          {isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-700 py-3">
          <div className="flex flex-col items-center space-y-4">
            <Link
              to="/"
              className="text-white hover:text-blue-400 transition duration-300 font-medium"
              onClick={toggleMobileMenu}
            >
              Home
            </Link>
            {auth.isAuthenticated && (
              <Link
                to="/favorites"
                className="text-white hover:text-blue-400 transition duration-300 font-medium"
                onClick={toggleMobileMenu}
              >
                Favorites
              </Link>
            )}
            {auth.isAuthenticated ? (
              <Link
                to="#"
                onClick={() => {
                  onLogout();
                  toggleMobileMenu();
                }}
                className="hover:bg-blue-700 hover:text-white px-4 py-2 rounded-lg shadow-md transition duration-300"
              >
                Logout
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hover:bg-blue-700 hover:text-white px-4 py-2 rounded-lg shadow-md transition duration-300"
                  onClick={toggleMobileMenu}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="hover:bg-blue-700 hover:text-white px-4 py-2 rounded-lg shadow-md transition duration-300"
                  onClick={toggleMobileMenu}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
