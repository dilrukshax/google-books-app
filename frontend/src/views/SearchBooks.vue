<!-- frontend/src/views/SearchBooks.vue -->
<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">Search Books</h2>
    <form @submit.prevent="searchBooks" class="mb-6 flex">
      <input
        v-model="query"
        type="text"
        placeholder="Search for books..."
        class="flex-grow px-4 py-2 border rounded-l"
        required
      />
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-r">Search</button>
    </form>

    <!-- Loading Indicator -->
    <div v-if="isLoading" class="text-center">Loading...</div>

    <!-- Error Message -->
    <div v-if="error" class="text-red-500 mb-4">{{ error }}</div>

    <!-- Books List -->
    <div v-if="books && books.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <BookItem v-for="book in books" :key="book.id" :book="book" />
    </div>

    <!-- No Books Found -->
    <div v-else-if="!isLoading && !error" class="text-center">No books found.</div>
  </div>
</template>

<script>
import BookItem from '../components/BookItem.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'SearchBooks',
  components: {
    BookItem,
  },
  data() {
    return {
      query: '',
    };
  },
  computed: {
    ...mapGetters(['getBooks', 'isLoading', 'getError']),
    books() {
      return this.getBooks;
    },
    error() {
      return this.getError;
    },
  },
  methods: {
    ...mapActions(['fetchBooks']),
    async searchBooks() {
      if (!this.query.trim()) {
        // Optional: Set an error message if query is empty
        // You can also handle this via form validation
        this.$store.commit('SET_ERROR', 'Please enter a search query.');
        return;
      }
      await this.fetchBooks(this.query);
    },
  },
  mounted() {
    // Optionally, you can fetch initial books or leave it empty
  },
};
</script>

<style scoped>
/* Scoped styles for SearchBooks */
</style>
