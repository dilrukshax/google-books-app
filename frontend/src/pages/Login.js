// frontend/src/pages/Login.js
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import loginIllustration from '../assets/login-illustration.svg'; // Replace with your illustration file path

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState('');

  const { username, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/auth/login`,
        {
          username,
          password,
        }
      );

      login(res.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-200">
      <div className="bg-white shadow-2xl rounded-lg flex flex-col md:flex-row w-full max-w-none md:max-w-5xl">
        {/* Illustration Section */}
        <div className="hidden md:flex flex-col justify-center items-center w-full md:w-1/2 bg-gradient-to-b from-blue-200 to-blue-100 p-8">
          <img
            src={loginIllustration}
            alt="Login Illustration"
            className="w-3/4 mb-6 animate-fadeIn"
          />
          <h2 className="text-2xl font-semibold text-blue-700 mb-2">
            Welcome Back!
          </h2>
          <p className="text-gray-700 text-center max-w-xs">
            Access your account and explore our extensive books collection with ease.
          </p>
        </div>

        {/* Login Form Section */}
        <div className="w-full md:w-1/2 p-10 bg-white">
          <h2 className="text-3xl font-bold mb-8 text-center text-blue-600">
            Login to Your Account
          </h2>
          {error && (
            <div className="bg-red-100 text-red-700 p-4 rounded mb-6 border border-red-200 animate-pulse">
              {error}
            </div>
          )}
          <form onSubmit={onSubmit}>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2 font-medium" htmlFor="username">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={onChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
                placeholder="Enter your username"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2 font-medium" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={onChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
            >
              Login
            </button>
          </form>
          <p className="mt-6 text-center text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-600 hover:underline font-medium">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
