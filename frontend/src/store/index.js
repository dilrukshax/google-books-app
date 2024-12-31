// frontend/src/store/index.js
import { createStore } from 'vuex';
import api from '../services/api'; // Import the Axios instance

export default createStore({
  state: {
    token: localStorage.getItem('token') || '',
    user: null,
    books: [], // Initialize as empty array
    loading: false,
    error: null,
    selectedBook: null, // For storing the currently selected book's details
    bookLoading: false,
    bookError: null,
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },
    CLEAR_TOKEN(state) {
      state.token = '';
    },
    SET_USER(state, user) {
      state.user = user;
    },
    CLEAR_USER(state) {
      state.user = null;
    },
    SET_BOOKS(state, books) {
      state.books = books || []; // Ensure books is always an array
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    SET_SELECTED_BOOK(state, book) {
      state.selectedBook = book;
    },
    SET_BOOK_LOADING(state, loading) {
      state.bookLoading = loading;
    },
    SET_BOOK_ERROR(state, error) {
      state.bookError = error;
    },
  },
  actions: {
    async register(_, { username, password }) {
      await api.post('/auth/register', { username, password });
      // Optionally, auto-login after registration
    },
    async login({ commit }, { username, password }) {
      const response = await api.post('/auth/login', { username, password });
      const token = response.data.token;
      localStorage.setItem('token', token);
      commit('SET_TOKEN', token);
      // Optionally, fetch user data here
    },
    logout({ commit }) {
      commit('CLEAR_TOKEN');
      commit('CLEAR_USER');
      localStorage.removeItem('token');
    },
    async fetchBooks({ commit }, query) {
      commit('SET_LOADING', true);
      commit('SET_ERROR', null);
      try {
        const response = await api.get('/books/search', { params: { q: query } });
        commit('SET_BOOKS', response.data.books);
      } catch (err) {
        commit('SET_ERROR', err.response?.data?.error || 'Failed to fetch books.');
      } finally {
        commit('SET_LOADING', false);
      }
    },
    async fetchBooksByCategory({ commit }, category) {
      commit('SET_LOADING', true);
      commit('SET_ERROR', null);
      try {
        const response = await api.get(`/books/category/${category}`);
        commit('SET_BOOKS', response.data.books);
      } catch (err) {
        commit('SET_ERROR', err.response?.data?.error || 'Failed to fetch books.');
      } finally {
        commit('SET_LOADING', false);
      }
    },
    async fetchBookById({ commit }, id) {
      commit('SET_BOOK_LOADING', true);
      commit('SET_BOOK_ERROR', null);
      try {
        const response = await api.get(`/books/${id}`);
        commit('SET_SELECTED_BOOK', response.data.book);
        return response.data.book;
      } catch (err) {
        commit('SET_BOOK_ERROR', err.response?.data?.error || 'Failed to fetch book details.');
        throw err;
      } finally {
        commit('SET_BOOK_LOADING', false);
      }
    },
    initializeStore({ commit }) {
      const token = localStorage.getItem('token');
      if (token) {
        commit('SET_TOKEN', token);
        // Optionally, validate token or fetch user data
      }
    },
  },
  getters: {
    isAuthenticated: state => !!state.token,
    getToken: state => state.token,
    getBooks: state => state.books,
    isLoading: state => state.loading,
    getError: state => state.error,
    getSelectedBook: state => state.selectedBook,
    isBookLoading: state => state.bookLoading,
    getBookError: state => state.bookError,
  },
  modules: {
    // Add modules if needed
  },
});
