<template>
  <div id="app" style="padding: 20px;">
    <h1>Google Books Search</h1>
    <SearchBar @search="fetchBooks" />
    <BookList :books="books" />
  </div>
</template>

<script>
import axios from 'axios';
import SearchBar from './components/SearchBar.vue';
import BookList from './components/BookList.vue';

export default {
  components: {
    SearchBar,
    BookList,
  },
  data() {
    return {
      books: [],
    };
  },
  methods: {
    async fetchBooks(query) {
      try {
        const response = await axios.get(`http://localhost:5000/api/books/search?q=${query}`);
        this.books = response.data.books;
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    },
  },
};
</script>
