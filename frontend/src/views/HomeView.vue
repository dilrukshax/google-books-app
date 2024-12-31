<!-- frontend/src/views/HomeView.vue -->
<template>
  <div>
    <CategorySection :selectedCategory="currentCategory" @category-selected="handleCategorySelected" />

    <!-- Loading Indicator -->
    <div v-if="isLoading" class="text-center">Loading...</div>

    <!-- Error Message -->
    <div v-if="error" class="text-red-500 mb-4">{{ error }}</div>

    <!-- No Results Message -->
    <div v-if="books.length === 0 && !isLoading && hasSearched" class="text-center">No books found.</div>

    <!-- Books Grid -->
    <div v-if="books.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <BookCard v-for="book in books" :key="book.id" :book="book" />
    </div>
  </div>
</template>

<script>
import CategorySection from '../components/CategorySection.vue';
import BookCard from '../components/BookCard.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'HomeView',
  components: {
    CategorySection,
    BookCard,
  },
  data() {
    return {
      currentCategory: 'popular',
      hasSearched: false, // To track if a search has been performed
    };
  },
  computed: {
    ...mapGetters(['getBooks', 'isLoading', 'getError']),
    books() {
      return this.getBooks || []; // Ensure books is always an array
    },
    error() {
      return this.getError;
    },
    isLoading() {
      return this.isLoading || false; // Default to false if undefined
    },
  },
  methods: {
    ...mapActions(['fetchBooksByCategory']),
    handleCategorySelected(categoryKey) {
      this.currentCategory = categoryKey;
      this.fetchBooksByCategory(categoryKey);
    },
  },
  mounted() {
    this.fetchBooksByCategory(this.currentCategory);
  },
};
</script>

<style scoped>
/* Scoped styles for HomeView */
</style>
