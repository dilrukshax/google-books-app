<!-- frontend/src/App.vue -->
<template>
  <div class="min-h-screen bg-gray-100">
    <AppNavbar />
    <div class="container mx-auto p-4">
      <router-view />
    </div>
  </div>
</template>

<script>
import AppNavbar from './components/AppNavbar.vue';

export default {
  name: 'App',
  components: {
    AppNavbar,
  },
};
</script>

<style>
/* Global styles can go here */
</style>
