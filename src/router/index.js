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
    path: '/signup',
    name: 'signup',
    component: () => import('../views/SignUp.vue')
  },
  {
    path: '/tweets',
    name: 'tweets',
    component: () => import('../views/Tweets.vue')
  },
  {
    path: '/tweets/:id',
    name: 'tweet',
    component: () => import('../views/Tweet.vue')
  },
  {
    path: '/admin/signin',
    name: 'signinAdmin',
    component: () => import('../views/SignInAdmin.vue')
  },
  {
    path: '/setting',
    name: 'setting',
    component: () => import('../views/Setting.vue')
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
