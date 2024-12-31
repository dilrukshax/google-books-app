<!-- src/views/RegisterView.vue -->
<template>
  <div class="max-w-md mx-auto bg-white p-6 rounded shadow">
    <h2 class="text-2xl font-bold mb-4">Register</h2>
    <form @submit.prevent="handleRegister">
      <div class="mb-4">
        <label class="block text-gray-700">Username</label>
        <input v-model="username" type="text" required class="w-full px-3 py-2 border rounded">
      </div>
      <div class="mb-4">
        <label class="block text-gray-700">Password</label>
        <input v-model="password" type="password" required class="w-full px-3 py-2 border rounded">
      </div>
      <div v-if="error" class="mb-4 text-red-500">
        {{ error }}
      </div>
      <button type="submit" class="w-full bg-green-500 text-white py-2 rounded">Register</button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'RegisterView',
  data() {
    return {
      username: '',
      password: '',
      error: '',
    };
  },
  computed: {
    ...mapGetters(['isAuthenticated']),
  },
  methods: {
    ...mapActions(['register']),
    async handleRegister() {
      try {
        await this.register({ username: this.username, password: this.password });
        this.$router.push('/login');
      } catch (err) {
        this.error = err.response?.data?.error || 'Registration failed.';
      }
    },
  },
  mounted() {
    if (this.isAuthenticated) {
      this.$router.push('/search');
    }
  },
};
</script>

<style scoped>
/* Scoped styles for RegisterView */
</style>
