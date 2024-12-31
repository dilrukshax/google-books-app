<!-- frontend/src/components/AppNavbar.vue -->
<template>
  <nav class="bg-white shadow">
    <div class="container mx-auto px-4 py-4 flex justify-between items-center">
      <div>
        <router-link to="/" class="text-xl font-bold text-gray-800">Google Books</router-link>
      </div>
      <div>
        <template v-if="isAuthenticated">
          <router-link to="/search" class="mr-4 text-gray-700 hover:text-gray-900">Search Books</router-link>
          <button @click="logout" class="text-gray-700 hover:text-gray-900">Logout</button>
        </template>
        <template v-else>
          <router-link to="/login" class="mr-4 text-gray-700 hover:text-gray-900">Login</router-link>
          <router-link to="/register" class="text-gray-700 hover:text-gray-900">Register</router-link>
        </template>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'AppNavbar',
  computed: {
    ...mapGetters(['isAuthenticated']),
  },
  methods: {
    ...mapActions(['logout']),
  },
};
</script>

<style scoped>
/* Scoped styles for AppNavbar */
</style>
