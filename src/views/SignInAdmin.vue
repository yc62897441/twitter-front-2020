<template>
  <div class="sign-container">
    <div class="sign-wrapper">
      <div class="sign-logo-wrapper">
        <img src="../assets/alpha_camp_logo.png" alt="">
      </div>
      <div class="sign-title">後台登入</div>
      <form @submit.prevent.stop="handleSubmit" class="sign-form">
        <div class="form-row sign-form-row mb-3">
          <input v-model="email" style="background-color:#F5F8FA;" type="email" maxlength="140" class="form-control"
            id="signInInputEmail" aria-describedby="emailHelp" placeholder="帳號" name="email" required autofocus>
        </div>
        <div class="form-row sign-form-row mb-3">
          <input v-model="password" style="background-color:#F5F8FA;" type="password" maxlength="20"
            class="form-control" id="signInInputPassword" placeholder="密碼" name="password" required>
        </div>
        <button type="submit" class="btn sign-btn" v-bind:disabled="isProcessing">登入</button>
        <div class="sign-form-footer">
          <router-link to="/signin">前臺登入</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import authorizationAPI from '../api/authorization'
import { Toast } from '../utils/helpers'

export default {
  data() {
    return {
      email: '',
      password: '',
      isProcessing: false
    }
  },
  methods: {
    async handleSubmit(e) {
      try {
        // 登入表單沒填寫資訊的情況
        if (!this.email || !this.password) {
          Toast.fire({
            icon: 'warning',
            title: '請填寫 email 和 password'
          })
          return
        }
        // 避免使用者移除 input 的 maxlength="20" 屬性
        if (this.email.length > 20) {
          this.email = this.email.slice(0, 20)
        }
        if (this.password.length > 20) {
          this.password = this.password.slice(0, 20)
        }
        this.isProcessing = true

        const response = await authorizationAPI.signInAdmin({
          email: this.email,
          password: this.password
        })
        const { data } = response

        // 伺服器回傳登入驗證錯誤
        if (data.status !== 'success') {
          throw new Error()
        }

        // 登入驗證成功
        // 儲存 token 到瀏覽器內 
        localStorage.setItem('token', data.token)

        // 先將 user data 存到 localstorage，之後再修改儲存到 Vuex
        localStorage.setItem('user', data.user)
        // 將資料傳到 Vuex 中
        // this.$store.commit('setCurrentUser', data.user)

        // 跳轉頁面，導入首頁
        this.$router.push('/admin/main')
      } catch (error) {
        this.isProcessing = false
        this.password = ''
        let title = '伺服器維護中，請稍後再試'
        if (error.response.data.message) {
          title = error.response.data.message
        }
        Toast.fire({
          icon: 'warning',
          title: title
        })
        console.warn('error', error)
      }
    }
  }
}
</script>
