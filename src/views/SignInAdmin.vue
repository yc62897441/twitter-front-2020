<template>
  <div class="sign-container">
    <div class="sign-wrapper">
      <div class="sign-logo-wrapper">
        <img src="../assets/alpha_camp_logo.png" alt="">
      </div>
      <div class="sign-title">後台登入</div>
      <form @submit.prevent.stop="handleSubmit" class="sign-form">
        <div class="form-row sign-form-row mb-3">
          <input v-model="email" style="background-color:#F5F8FA;" type="email" maxlength="50" class="form-control"
            id="signInInputEmail" aria-describedby="emailHelp" placeholder="帳號" name="email" v-on:keyup='words_deal'
            onkeyup="value=value.replace(/[^\a-\z\A-\Z0-9\@\.\-\*]/g,'')"
            onpaste="value=value.replace(/[^\a-\z\A-\Z0-9\@\.\-\*]/g,'')"
            oncontextmenu="value=value.replace(/[^\a-\z\A-\Z0-9\@\.\-\*]/g,'')" required autofocus>
          <div class="textContent-span-wrapper">
            <span class="textContent-span textContent-span-warning textContent-span-hidden">字數已達上限!</span>
            <span class="textContent-span textContent-span-hidden"></span>
          </div>
        </div>
        <div class="form-row sign-form-row mb-3">
          <input v-model="password" style="background-color:#F5F8FA;" type="password" maxlength="20"
            class="form-control" id="signInInputPassword" placeholder="密碼" name="password" v-on:keyup='words_deal'
            onkeyup="value=value.replace(/[^\a-\z\A-\Z0-9\@\.\-\*]/g,'')"
            onpaste="value=value.replace(/[^\a-\z\A-\Z0-9\@\.\-\*]/g,'')"
            oncontextmenu="value=value.replace(/[^\a-\z\A-\Z0-9\@\.\-\*]/g,'')" required>
          <div class="textContent-span-wrapper">
            <span class="textContent-span textContent-span-warning textContent-span-hidden">字數已達上限!</span>
            <span class="textContent-span textContent-span-hidden"></span>
          </div>
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
      isProcessing: false,
      allowedSymbols: '@.*-',
      allowedNumbers: '0123456789',
      allowedUpperChars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      allowedLowerChars: 'abcdefghijklmnopqrstuvwxyz',
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

        // 檢查 email、password 輸入內容長度，避免使用者移除 input 的 maxlength="20"or"50" 屬性
        const maxlengthErrorMessages = []
        if (this.email.length > 50) {
          maxlengthErrorMessages.push('Email')
        }
        if (this.password.length > 20) {
          maxlengthErrorMessages.push('Password')
        }
        if (maxlengthErrorMessages.length > 0) {
          let title = ''
          maxlengthErrorMessages.forEach(message => {
            title += `${message} `
          })
          title += '輸入內容長度超出限制'
          Toast.fire({
            icon: 'warning',
            title: title
          })
          return
        }

        // 檢查 email、password 只允許半形大小寫英文、數字與 @*-. 符號
        const checkErrorMessages = []
        const allowChars = this.allowedSymbols + this.allowedNumbers + this.allowedUpperChars + this.allowedLowerChars
        function checkChars(checkObject, checkObjectName, allowChars) {
          for (let i = 0; i < checkObject.length; i++) {
            if (!allowChars.includes(checkObject[i])) {
              checkErrorMessages.push(`${checkObjectName}`)
              return
            }
          }
        }
        checkChars(this.email, 'Email', allowChars)
        checkChars(this.password, 'Password', allowChars)
        if (checkErrorMessages.length > 0) {
          let title = ''
          checkErrorMessages.forEach(message => {
            title += `${message} `
          })
          title += '只允許半形大小寫英文、數字與 @*-. 符號'
          Toast.fire({
            icon: 'warning',
            title: title
          })
          return
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
