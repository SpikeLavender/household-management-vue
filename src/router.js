import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      component: () => import('./views/Login.vue'),
      name: 'login',
      hidden: true
    },
    {
      path: '/register',
      component: () => import('./views/Register.vue'),
      name: 'register',
      hidden: true
    },
    {
      path: '/404',
      component: () => import('./views/404.vue'),
      name: '404',
      hidden: true
    },
    {
      path: '/adminHome',
      component: () => import('./views/AdminHome.vue'),
      name: 'Home'
    },
    {
      path: '/userHome',
      component: () => import('./views/UserHome.vue'),
      name: 'Home'
    },
    {
      path: '/',
      component: () => import('./views/UserHome.vue'),
      name: 'Home'
    },
    {
      path: '*',
      hidden: true,
      redirect: { path: '/404' }
    }
  ]
});
