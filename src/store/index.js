import Vue from 'vue'
import Vuex from 'vuex'
import usersAPI from '../api/users'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {
      id: -1,
      name: '',
      email: '',
      image: '',
      isAdmin: false
    },
    isAuthenticated: false,
    token: '',
  },
  getters: {
  },
  mutations: {
    setCurrentUser(state, currentUser) {
      // 將資料存到 state 中，供所有 vue 元件取用
      state.currentUser = {
        ...state.currentUser,
        // 將 API 取得的 currentUser 覆蓋掉 Vuex state 中的 currentUser
        ...currentUser
      }
      // 將使用者的登入狀態改為 true
      state.isAuthenticated = true
      // 將使用者驗證用的 token 儲存在 state 中
      state.token = localStorage.getItem('token')
    },
    revokeAuthentication(state) {
      state.currentUser = {}
      state.isAuthenticated = false
      state.token = ''
      localStorage.removeItem('token')
    }
  },
  actions: {
    async fetchCurrentUser({ commit }) {
      try {
        // 每次路由改變(如重新整理)時，都會再去 getCurrentUser，並且用 setCurrentUser 將資料存到 vuex state 中
        // 如果沒有加這個，路由改變時，state 的 currentUser 就會變回預設空空的內容
        const response = await usersAPI.getCurrentUser()
        if (response.statusText !== 'OK') {
          throw new Error(response.statusText)
        }
        const data = response.data
        commit('setCurrentUser', data)
        return true
      } catch (error) {
        console.warn(error)
        return false
      }
    }
  },
  modules: {
  }
})
