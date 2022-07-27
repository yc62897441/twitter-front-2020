import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '../views/NotFound.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/signin',
    name: 'signin',
    component: () => import('../views/SignIn.vue')
  },
  {
    path: '*',
    name: 'not-found',
    component: NotFound,
    // 動態載入寫法 component: () => import('../views/NotFound.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
