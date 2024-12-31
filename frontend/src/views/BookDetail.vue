<!-- frontend/src/views/BookDetail.vue -->
<template>
    <div class="container mx-auto p-4">
      <button
        @click="$router.go(-1)"
        class="mb-4 bg-gray-300 text-gray-800 px-3 py-1 rounded hover:bg-gray-400 transition-colors duration-200"
      >
        &larr; Back
      </button>
  
      <!-- Loading Indicator -->
      <div v-if="bookLoading" class="text-center">Loading...</div>
  
      <!-- Error Message -->
      <div v-if="bookError" class="text-red-500 mb-4">{{ bookError }}</div>
  
      <!-- Book Details -->
      <div v-if="book" class="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden p-6 flex flex-col md:flex-row">
        <!-- Book Thumbnail -->
        <img
          :src="book.thumbnail"
          alt="Book Thumbnail"
          class="w-full md:w-1/3 h-auto object-cover rounded-md mb-4 md:mb-0 md:mr-6"
        />
  
        <!-- Book Information -->
        <div class="flex-1">
          <h1 class="text-2xl font-bold mb-2">{{ book.title }}</h1>
          <p class="text-gray-700 mb-2"><strong>Authors:</strong> {{ book.authors.join(', ') }}</p>
          <p class="text-gray-700 mb-2"><strong>Publisher:</strong> {{ book.publisher }}</p>
          <p class="text-gray-700 mb-2"><strong>Published Date:</strong> {{ book.publishedDate }}</p>
          <p class="text-gray-700 mb-2"><strong>Page Count:</strong> {{ book.pageCount }}</p>
          <p class="text-gray-700 mb-2"><strong>Categories:</strong> {{ book.categories.join(', ') }}</p>
          <p class="text-gray-700 mb-4"><strong>Language:</strong> {{ book.language.toUpperCase() }}</p>
          <div class="text-gray-800">
            <h2 class="text-xl font-semibold mb-2">Description</h2>
            <p>{{ book.description }}</p>
          </div>
          <a
            :href="book.previewLink"
            target="_blank"
            rel="noopener noreferrer"
            class="mt-4 inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-200"
          >
            Preview Book
          </a>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex';
  
  export default {
    name: 'BookDetail',
    props: {
      id: {
        type: String,
        required: true,
      },
    },
    computed: {
      ...mapGetters(['getSelectedBook', 'isBookLoading', 'getBookError']),
      book() {
        return this.getSelectedBook;
      },
      bookLoading() {
        return this.isBookLoading;
      },
      bookError() {
        return this.getBookError;
      },
    },
    methods: {
      ...mapActions(['fetchBookById']),
      async loadBook() {
        try {
          await this.fetchBookById(this.id);
        } catch (error) {
          // Error is already handled in Vuex; additional handling can be done here if needed
          console.error('Error fetching book details:', error);
        }
      },
    },
    mounted() {
      this.loadBook();
    },
  };
  </script>
  
  <style scoped>
  /* Scoped styles for BookDetail */
  </style>
  