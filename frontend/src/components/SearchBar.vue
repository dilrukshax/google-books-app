<template>
    <div style="margin-bottom: 20px;">
      <input
        v-model="query"
        type="text"
        placeholder="Search for books..."
        style="padding: 10px; width: 70%;"
      />
      <button @click="handleSearch" style="padding: 10px; margin-left: 10px;">
        Search
      </button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        query: '',
      };
    },
    methods: {
      handleSearch() {
        if (this.query.trim() !== '') {
          this.$emit('search', this.query);
        }
      },
    },
  };
  </script>
  