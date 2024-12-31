<!-- frontend/src/components/CategorySection.vue -->
<template>
    <div class="mb-6">
      <h3 class="text-xl font-semibold mb-2">Categories</h3>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="category in categories"
          :key="category.key"
          @click="selectCategory(category.key)"
          :class="[
            'px-4 py-2 rounded',
            selectedCategory === category.key ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
          ]"
        >
          {{ category.name }}
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CategorySection',
    props: {
      selectedCategory: {
        type: String,
        default: 'popular',
      },
    },
    data() {
      return {
        categories: [
          { key: 'popular', name: 'Popular' },
          { key: 'science-fiction', name: 'Science Fiction' },
          { key: 'fantasy', name: 'Fantasy' },
          { key: 'history', name: 'History' },
          { key: 'romance', name: 'Romance' },
          { key: 'mystery', name: 'Mystery' },
          { key: 'non-fiction', name: 'Non-Fiction' },
          // Add more categories as needed
        ],
      };
    },
    methods: {
      selectCategory(categoryKey) {
        this.$emit('category-selected', categoryKey);
      },
    },
  };
  </script>
  
  <style scoped>
  /* Scoped styles for CategorySection */
  </style>
  