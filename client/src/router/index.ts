import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import RegisterView from '@/views/RegisterView.vue';
import LoginView from '@/views/LoginView.vue';
import store from '@/store';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {requiresAuth: true}
  },

  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: {requiresAuth: false}
  },

  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    meta: {requiresAuth: false}
  },
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.state.isAuthenticated) {
    // Якщо потрібна авторизація і користувач не авторизований, перенаправляємо на сторінку Login
    next('/login');
  } else if (!to.meta.requiresAuth && store.state.isAuthenticated) {
    // Якщо не потрібна авторизація і користувач авторизований, перенаправляємо на сторінку HomeView
    next('/');
  } else {
    next(); // Якщо усе в порядку, продовжуємо перехід
  }
});

export default router
