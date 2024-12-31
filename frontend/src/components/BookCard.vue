<!-- frontend/src/components/BookCard.vue -->
<template>
    <div class="bg-white shadow-md rounded-lg overflow-hidden flex flex-col">
      <img :src="book.thumbnail" alt="Book Thumbnail" class="w-full h-48 object-cover">
      <div class="p-4 flex flex-col flex-grow">
        <h3 class="text-lg font-semibold mb-1">{{ book.title }}</h3>
        <p class="text-gray-600 text-sm mb-1">By: {{ book.authors.join(', ') }}</p>
        <p class="text-gray-600 text-sm mb-1">Publisher: {{ book.publisher }}</p>
        <p class="text-gray-600 text-sm mb-2">Published: {{ book.publishedDate }}</p>
        <p class="text-gray-700 text-sm flex-grow">
          {{ truncateDescription(book.description) }}
        </p>
        <button
          @click="viewDetails"
          class="mt-4 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors duration-200"
        >
          View Details
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'BookCard',
    props: {
      book: {
        type: Object,
        required: true,
      },
    },
    methods: {
      truncateDescription(description) {
        const maxLength = 100;
        if (description.length > maxLength) {
          return description.substring(0, maxLength) + '...';
        }
        return description;
      },
      viewDetails() {
        this.$router.push({ name: 'BookDetail', params: { id: this.book.id } });
      },
    },
  };
  </script>
  
  <style scoped>
  /* Scoped styles for BookCard */
  </style>
  