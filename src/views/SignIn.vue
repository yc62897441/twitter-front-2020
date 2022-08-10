<template>
  <div class="sign-container">
    <div class="sign-wrapper">
      <div class="sign-logo-wrapper">
        <img src="../assets/alpha_camp_logo.png" alt="">
      </div>
      <div class="sign-title">登入 Alphitter</div>
      <form @submit.prevent.stop="handleSubmit" class="sign-form">
        <div class="form-row sign-form-row mb-3">
          <!-- <label for="signInInputEmail" class="form-label">Email address</label> -->
          <input v-model="email" style="background-color:#F5F8FA;" type="email" class="form-control"
            id="signInInputEmail" aria-describedby="emailHelp" placeholder="帳號" name="email" required autofocus>
        </div>
        <div class="form-row sign-form-row mb-3">
          <!-- <label for="signInInputPassword" class="form-label">Password</label> -->
          <input v-model="password" style="background-color:#F5F8FA;" type="password" class="form-control"
            id="signInInputPassword" placeholder="密碼" name="password" required>
        </div>
        <button type="submit" class="btn sign-btn btn-orange" v-bind:disabled="isProcessing">登入</button>
        <div class="sign-form-footer">
          <router-link to="/signup">註冊 Alphitter</router-link> · <router-link to="/admin/signin">後臺登入</router-link>
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
        this.isProcessing = true

        const response = await authorizationAPI.signIn({
          email: this.email,
          password: this.password
        })
        const { data } = response

        // 伺服器回傳登入驗證錯誤
        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        // 登入驗證成功
        // 儲存 token 到瀏覽器內 
        localStorage.setItem('token', data.token)

        // 將 Vue 物件提交 mutation 事件，'setCurrentUser' 是在 mutations 定義好的 setCurrentUser
        this.$store.commit('setCurrentUser', data.user)

        // 跳轉頁面，導入首頁
        this.$router.push('/tweets')
      } catch (error) {
        this.isProcessing = false
        this.password = ''
        Toast.fire({
          icon: 'warning',
          title: '請確認您輸入了正確的帳號密碼'
        })
        console.warn('error', error)
      }
    }
  }
}
</script>

<style>
.sign-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  padding-top: 65px;
}

.sign-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 600px;
}

.sign-logo-wrapper img {
  width: 40px;
  height: 40px;
}

.sign-title {
  padding-top: 25px;
  font-weight: 700;
  font-size: 23px;
  line-height: 33px;
  color: #1C1C1C;
}

.sign-form {
  width: 100%;
  max-width: 540px;
  padding-top: 40px;
}

.sign-form-row {
  position: relative;
}

.sign-form-row::after {
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 2px;
  content: '';
  background: #657786;
  border-radius: 0px 0px 4px 4px;
}

.sign-form input {
  height: 52px;
  margin-bottom: 32px;
  /* background-color: inline-style-setting; */
  border-radius: 0px 0px 4px 4px;
}

.sign-btn {
  border-radius: 50px;
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 26px;
  color: #FFFFFF;
}

.sign-form-footer {
  display: flex;
  justify-content: end;
  height: 26px;
  margin-top: 26px;
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 26px;
  text-align: right;
  text-decoration-line: underline;
  color: #0099FF;
}
</style>