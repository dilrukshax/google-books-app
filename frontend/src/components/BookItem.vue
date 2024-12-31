<template>
    <li style="margin-bottom: 20px; border: 1px solid #ddd; padding: 10px; display: flex;">
      <img
        :src="book.thumbnail"
        :alt="book.title"
        style="width: 100px; height: auto; margin-right: 10px;"
      />
      <div>
        <h3>{{ book.title }}</h3>
        <p><strong>Author(s):</strong> {{ book.authors.join(', ') }}</p>
        <p><strong>Publisher:</strong> {{ book.publisher }}</p>
        <p>{{ book.description }}</p>
      </div>
    </li>
  </template>
  
  <script>
  export default {
    props: {
      book: {
        type: Object,
        required: true,
      },
    },
  };
  </script>
  