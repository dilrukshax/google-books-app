<!-- frontend/src/components/BookItem.vue -->
<template>
  <div class="bg-white shadow-md rounded p-4 flex flex-col">
    <div class="flex-shrink-0">
      <img :src="book.thumbnail" alt="Book Thumbnail" class="w-full h-48 object-cover mb-4">
    </div>
    <div class="flex-grow">
      <h2 class="text-xl font-semibold">{{ book.title }}</h2>
      <p class="text-gray-600">By: {{ book.authors.join(', ') }}</p>
      <p class="mt-2 text-gray-700">{{ book.description }}</p>
    </div>
    <div class="mt-4 text-sm text-gray-500">
      Publisher: {{ book.publisher }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'BookItem',
  props: {
    book: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
/* Scoped styles for BookItem */
</style>
