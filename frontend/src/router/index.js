// frontend/src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import SearchBooks from '../views/SearchBooks.vue';
import BookDetail from '../views/BookDetail.vue'; // Import the DetailView component
import store from '../store';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    meta: { guest: true },
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView,
    meta: { guest: true },
  },
  {
    path: '/search',
    name: 'SearchBooks',
    component: SearchBooks,
    meta: { requiresAuth: true },
  },
  {
    path: '/book/:id',
    name: 'BookDetail',
    component: BookDetail,
    meta: { requiresAuth: true },
    props: true, // Allows route params to be passed as props to the component
  },
  // Redirect unknown routes to Home
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation Guards
router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated;

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else if (to.meta.guest && isAuthenticated) {
    next('/search');
  } else {
    next();
  }
});

export default router;
