<template>
    <div>
      <p v-if="books.length === 0">No books found. Try searching for something else!</p>
      <ul v-else style="list-style-type: none; padding: 0;">
        <BookItem v-for="book in books" :key="book.id" :book="book" />
      </ul>
    </div>
  </template>
  
  <script>
  import BookItem from './BookItem.vue';
  
  export default {
    props: {
      books: {
        type: Array,
        required: true,
      },
    },
    components: {
      BookItem,
    },
  };
  </script>
  