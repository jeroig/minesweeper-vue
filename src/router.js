import Vue from 'vue'
import Router from 'vue-router'
import store from '@/vuex/store'
import Home from './views/Home.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue'),
    },
    {
      path: '/minesweeper',
      name: 'minesweeper',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./views/Minesweeper.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/logout',
      beforeEnter: (to, from, next) => {
        store.dispatch('logout')
        //next("/");
      },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('user')
  if (to.matched.some((record) => record.meta.requiresAuth) && !loggedIn) {
    next('/')
  }
  next()
})

export default router
