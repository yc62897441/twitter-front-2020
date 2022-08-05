<template>
  <div class="container">
    <div class="left-container">
      <Navbar class="Navbar" />
    </div>
    <div class="middle-container">
      <h1>帳戶設定</h1>
      <div class="setting-form-wrapper">
        <form @submit.prevent.stop="handleSubmit">
          <div class="form-row">
            <input v-model="user.account" style="background-color:#F5F8FA;" type="text" class="form-control"
              id="signUpInputAccount" aria-describedby="accountHelp" placeholder="帳號" name="account" required autofocus>
          </div>
          <div class="form-row">
            <input v-model="user.name" style="background-color:#F5F8FA;" type="text" class="form-control"
              id="signUpInputName" aria-describedby="nameHelp" placeholder="名稱" name="name" required>
          </div>
          <div class="form-row">
            <input v-model="user.email" style="background-color:#F5F8FA;" type="email" class="form-control"
              id="signUpInputEmail" aria-describedby="emailHelp" placeholder="email" name="email" required>
          </div>
          <div class="form-row">
            <input v-model="user.password" style="background-color:#F5F8FA;" type="password" class="form-control"
              id="signUpInputPassword" placeholder="密碼" name="password">
          </div>
          <div class="form-row">
            <input v-model="user.checkPassword" style="background-color:#F5F8FA;" type="password" class="form-control"
              id="signUpInputCheckPassword" placeholder="密碼確認" name="checkPassword">
          </div>
          <button type="submit" class="btn btn-orange" v-bind:disabled="isProcessing">儲存</button>
        </form>
      </div>
    </div>
    <div class="right-container">
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import usersAPI from '../api/users'
import { Toast } from '../utils/helpers'

export default {
  components: {
    Navbar
  },
  data() {
    return {
      currentUserId: 1,
      user: {
        account: '',
        name: '',
        email: '',
        password: '',
        checkPassword: '',
      },
      isProcessing: false
    }
  },
  methods: {
    async fetchUser() {
      try {
        const userId = this.currentUserId
        const { data } = await usersAPI.getUser({ userId })
        this.user = {
          ...data,
        }
      } catch (error) {
        console.warn(error)
      }
    },
    async handleSubmit() {
      try {
        if (this.user.password !== this.user.checkPassword) {
          this.user.password = ''
          this.user.checkPassword = ''
          Toast.fire({
            icon: 'warning',
            title: 'password, checkPassword 不一致'
          })
          return
        }
        this.isProcessing = true
        const userId = this.currentUserId
        const formData = {
          name: this.user.name,
          email: this.user.email,
          account: this.user.account,
          password: this.user.password,
          checkPassword: this.user.checkPassword
        }
        const { data } = await usersAPI.putUser({ userId, formData })
        this.user = {
          ...data,
        }
        this.isProcessing = false
        this.user.password = ''
        this.user.checkPassword = ''
      } catch (error) {
        this.isProcessing = false
        console.warn(error)
      }
    }
  },
  created() {
    this.fetchUser()
  }
}
</script>

<style>
.container {
  display: flex;
  flex-direction: row;
  padding: 0px;
  align-items: flex-start;
}

.middle-container {
  width: 600px;
  margin-left: 240px;
  margin-right: 30px;
  border-left: 1px solid #E6ECF0;
  border-right: 1px solid #E6ECF0;
}

.setting-form-wrapper {
  padding: 15px;
}

.setting-form-wrapper form {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.setting-form-wrapper form div {
  width: 100%;
}

.setting-form-wrapper form input {
  margin: 32px 0px 0px;
}

.setting-form-wrapper form :nth-child(1) input {
  margin: 0px 0px;
}

.setting-form-wrapper .btn-orange {
  width: 116px;
  height: 46px;
}
</style>