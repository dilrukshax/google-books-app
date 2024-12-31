// frontend/src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/tailwind.css'; // Import Tailwind CSS

store.dispatch('initializeStore');

createApp(App)
  .use(store)
  .use(router)
  .mount('#app');
