import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '../views/NotFound.vue'
import store from '../store/index'

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
    path: '/users/:id/followship',
    name: 'userFollowship',
    component: () => import('../views/Followship.vue')
  },
  {
    path: '/users/:id',
    name: 'user',
    component: () => import('../views/User.vue')
  },
  {
    path: '/admin/signin',
    name: 'signinAdmin',
    component: () => import('../views/SignInAdmin.vue')
  },
  {
    path: '/admin/main',
    name: 'adminMain',
    component: () => import('../views/AdminMain.vue')
  },
  {
    path: '/admin/users',
    name: 'adminUsers',
    component: () => import('../views/AdminUsers.vue')
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
  {
    path: '/test/:id',
    name: 'test',
    component: () => import('../views/Test.vue')
  },
]

const router = new VueRouter({
  linkExactActiveClass: 'active',
  routes
})

router.beforeEach(async (to, from, next) => {
  // 從 localStorage 取出 token，從 vuex 取出 token
  // 如果有登入了，兩者都會有東西
  const token = localStorage.getItem('token')
  const tokenInStore = store.state.token

  // 如果有登入了，store.state.isAuthenticated 會是 true
  let isAuthenticated = store.state.isAuthenticated

  // 如果 localStorage 有 token，且跟 vuex 的 token 一致時，跳過以下步驟，不須重新檢查  localStorage 的 token 是否還正確
  // 如果 localStorage 有 token，但 token 跟存在 vuex 的 token 不一致時，要重新檢查 localStorage 的 token 是否還正確
  // fetchCurrentUser() 會攜帶 localStorage 的 token 向後端 getCurrentUser()，藉此檢查 localStorage 的 token
  // 如果 localStorage 的 token 還是有效，isAuthenticated = true 否則為 false
  if (token && (token !== tokenInStore)) {
    // 取得驗證成功與否 fetchCurrentUser() 回傳 true or false
    isAuthenticated = await store.dispatch('fetchCurrentUser')
  }

  // 對於不需要驗證 token 的頁面
  const pathsWithoutAuthentication = ['signin', 'signup', 'signinAdmin']

  // 如果 isAuthenticated 為 false，且進入需要驗證的頁面，則轉址到登入頁
  if (!isAuthenticated && !pathsWithoutAuthentication.includes(to.name)) {
    next('/signin')
    return
  }

  // 如果 isAuthenticated 為 true，且進入不需要驗證到頁面，則轉址到 tweets 首頁
  if (isAuthenticated && pathsWithoutAuthentication.includes(to.name)) {
    next('/tweets')
  }

  next()
})

export default router
