<template>
  <div class="sign-container">
    <div class="sign-wrapper">
      <div class="sign-logo-wrapper">
        <img src="../assets/alpha_camp_logo.png" alt="">
      </div>
      <div class="sign-title">登入Alphitter</div>
      <form @submit.prevent.stop="handleSubmit" class="sign-form">
        <div class="form-row sign-form-row mb-3">
          <!-- <label for="signInInputEmail" class="form-label">Email address</label> -->
          <input v-model="email" style="background-color:#F5F8FA;" type="email" maxlength="50" class="form-control"
            id="signInInputEmail" aria-describedby="emailHelp" placeholder="帳號" name="email" v-on:keyup='words_deal'
            required autofocus>
          <div class="textContent-span-wrapper">
            <span class="textContent-span textContent-span-warning textContent-span-hidden">字數已達上限!</span>
            <span class="textContent-span textContent-span-hidden"></span>
          </div>
        </div>
        <div class="form-row sign-form-row mb-3">
          <!-- <label for="signInInputPassword" class="form-label">Password</label> -->
          <input v-model="password" style="background-color:#F5F8FA;" type="password" maxlength="20"
            class="form-control" id="signInInputPassword" placeholder="密碼" name="password" v-on:keyup='words_deal'
            required>
          <div class="textContent-span-wrapper">
            <span class="textContent-span textContent-span-warning textContent-span-hidden">字數已達上限!</span>
            <span class="textContent-span textContent-span-hidden"></span>
          </div>
        </div>
        <button type="submit" class="btn sign-btn" v-bind:disabled="isProcessing">登入</button>
        <div class="sign-form-footer">
          <router-link to="/signup">註冊Alphitter</router-link>
          <p>·</p>
          <router-link to="/admin/signin">後臺登入</router-link>
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
        if (this.email.length > 50) {
          this.email = this.email.slice(0, 50)
        }
        if (this.password.length > 20) {
          this.password = this.password.slice(0, 20)
        }
        this.isProcessing = true

        const response = await authorizationAPI.signIn({
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

        // 將 Vue 物件提交 mutation 事件，'setCurrentUser' 是在 mutations 定義好的 setCurrentUser
        this.$store.commit('setCurrentUser', data.user)

        // 跳轉頁面，導入首頁
        this.$router.push('/tweets')
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
      }
    },
    words_deal(event) {
      const maxlength = event.target.attributes.maxlength.value
      const textlength = event.target.value.length

      // 可輸入的字數剩餘 20 字以內時
      if (maxlength - textlength <= 20) {
        // 顯示"目前字數/字數上限" 如 120/140
        event.target.parentElement.children[1].children[1].classList.remove('textContent-span-hidden')
        event.target.parentElement.children[1].children[1].textContent = `${textlength}/${maxlength}`

        // 目前字數>=字數上限時，顯示"字數已達上限"的提示
        if (textlength >= maxlength) {
          event.target.parentElement.children[1].children[0].classList.remove('textContent-span-hidden')
        } else {
          event.target.parentElement.children[1].children[0].classList.add('textContent-span-hidden')
        }
      } else {
        event.target.parentElement.children[1].children[0].classList.add('textContent-span-hidden')
        event.target.parentElement.children[1].children[1].classList.add('textContent-span-hidden')
      }
      return
    }
  }
}
</script>
