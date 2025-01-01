// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the context
export const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: true,
    user: null,
  });

  useEffect(() => {
    const loadUser = async () => {
      if (auth.token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${auth.token}`;
        // Optionally, fetch user details from the backend
        setAuth(prev => ({ ...prev, isAuthenticated: true, loading: false }));
      } else {
        setAuth(prev => ({ ...prev, loading: false }));
      }
    };

    loadUser();
  }, [auth.token]);

  const login = (token) => {
    localStorage.setItem('token', token);
    setAuth({
      token,
      isAuthenticated: true,
      loading: false,
      user: null, // You can set user data if fetched
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setAuth({
      token: null,
      isAuthenticated: false,
      loading: false,
      user: null,
    });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
