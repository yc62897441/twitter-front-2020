<template>
  <div class="sign-container">
    <div class="sign-wrapper">
      <div class="sign-logo-wrapper">
        <img src="../assets/alpha_camp_logo.png" alt="">
      </div>
      <div class="sign-title">建立你的帳號</div>
      <form @submit.prevent.stop="handleSubmit" class="sign-form">
        <div class="form-row sign-form-row mb-3">
          <input v-model="account" style="background-color:#F5F8FA;" type="text" maxlength="20" class="form-control"
            id="signUpInputAccount" aria-describedby="accountHelp" placeholder="帳號" name="account" required autofocus>
        </div>
        <div class="form-row sign-form-row mb-3">
          <input v-model="name" style="background-color:#F5F8FA;" type="text" maxlength="20" class="form-control"
            id="signUpInputName" aria-describedby="nameHelp" placeholder="名稱" name="name" required>
        </div>
        <div class="form-row sign-form-row mb-3">
          <input v-model="email" style="background-color:#F5F8FA;" type="email" maxlength="140" class="form-control"
            id="signUpInputEmail" aria-describedby="emailHelp" placeholder="email" name="email" required>
        </div>
        <div class="form-row sign-form-row mb-3">
          <input v-model="password" style="background-color:#F5F8FA;" type="password" maxlength="20"
            class="form-control" id="signUpInputPassword" placeholder="密碼" name="password" required>
        </div>
        <div class="form-row sign-form-row mb-3">
          <input v-model="checkPassword" style="background-color:#F5F8FA;" type="password" maxlength="20"
            class="form-control" id="signUpInputCheckPassword" placeholder="密碼確認" name="checkPassword" required>
        </div>
        <button type="submit" class="btn sign-btn" v-bind:disabled="isProcessing">註冊</button>
        <div class="sign-form-footer">
          <router-link to="/signin">登入</router-link>
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
      account: '',
      name: '',
      email: '',
      password: '',
      checkPassword: '',
      isProcessing: false
    }
  },
  methods: {
    async handleSubmit(e) {
      try {
        // 登入表單沒填寫資訊的情況
        if (!this.account || !this.name || !this.email || !this.password || !this.checkPassword) {
          Toast.fire({
            icon: 'warning',
            title: '請填寫 帳號、名稱、email、密碼和密碼確認'
          })
          this.password = ''
          this.checkPassword = ''
          return
        }
        if (this.password !== this.checkPassword) {
          Toast.fire({
            icon: 'warning',
            title: '密碼和密碼確認不一致'
          })
          this.password = ''
          this.checkPassword = ''
          return
        }

        Toast.fire({
          icon: 'warning',
          title: '正在處理註冊流程，請稍後',
          timer: false
        })
        this.isProcessing = true

        const response = await authorizationAPI.signUp({
          account: this.account,
          name: this.name,
          email: this.email,
          password: this.password,
          checkPassword: this.checkPassword
        })
        const { data } = response

        // 伺服器回傳登入驗證錯誤
        if (data.status !== 'success') {
          throw new Error()
        }

        Toast.fire({
          icon: 'success',
          title: '註冊成功'
        })

        // 跳轉頁面，導入登入頁面
        this.$router.push('/signin')
      } catch (error) {
        this.isProcessing = false
        this.password = ''
        this.checkPassword = ''
        let title = '伺服器維護中，請稍後再試'
        if (error.response.data.message) {
          title = error.response.data.message
        } else if (error.response.data.errorMessages.length > 0) {
          title = ''
          error.response.data.errorMessages.forEach(errorMessage => {
            title += `${errorMessage}\n`
          })
        }
        Toast.fire({
          icon: 'error',
          title: title
        })
      }
    }
  }
}
</script>
