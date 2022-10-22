<template>
  <div class="container">
    <div class="left-container">
      <Navbar class="Navbar" v-bind:currentUser="currentUser" v-bind:isSettingPage="isSettingPage" />
    </div>
    <div class="middle-container">
      <h1>帳戶設定</h1>
      <div class="setting-form-wrapper">
        <form @submit.prevent.stop="handleSubmit" class="setting-form">
          <div class="form-row setting-form-row">
            <input v-model="user.account" style="background-color:#F5F8FA;" type="text" maxlength="20"
              class="form-control" id="signUpInputAccount" aria-describedby="accountHelp" name="account"
              v-on:keyup='words_deal' required autofocus onkeyup="value=value.replace(/[^\a-\z\A-\Z0-9\@\.\-\*]/g,'')"
              onpaste="value=value.replace(/[^\a-\z\A-\Z0-9\@\.\-\*]/g,'')"
              oncontextmenu="value=value.replace(/[^\a-\z\A-\Z0-9\@\.\-\*]/g,'')">
            <div class="textContent-span-wrapper">
              <span class="textContent-span textContent-span-warning textContent-span-hidden">字數已達上限!</span>
              <span class="textContent-span textContent-span-hidden"></span>
            </div>
          </div>
          <div class="form-row setting-form-row">
            <input v-model="user.name" style="background-color:#F5F8FA;" type="text" maxlength="20" class="form-control"
              id="signUpInputName" aria-describedby="nameHelp" name="name" v-on:keyup='words_deal' required>
            <div class="textContent-span-wrapper">
              <span class="textContent-span textContent-span-warning textContent-span-hidden">字數已達上限!</span>
              <span class="textContent-span textContent-span-hidden"></span>
            </div>
          </div>
          <div class="form-row setting-form-row">
            <input v-model="user.email" style="background-color:#F5F8FA;" type="email" maxlength="50"
              class="form-control" id="signUpInputEmail" aria-describedby="emailHelp" name="email"
              v-on:keyup='words_deal' required onkeyup="value=value.replace(/[^\a-\z\A-\Z0-9\@\.\-\*]/g,'')"
              onpaste="value=value.replace(/[^\a-\z\A-\Z0-9\@\.\-\*]/g,'')"
              oncontextmenu="value=value.replace(/[^\a-\z\A-\Z0-9\@\.\-\*]/g,'')">
            <div class="textContent-span-wrapper">
              <span class="textContent-span textContent-span-warning textContent-span-hidden">字數已達上限!</span>
              <span class="textContent-span textContent-span-hidden"></span>
            </div>
          </div>
          <div class="form-row setting-form-row">
            <input v-model="user.password" style="background-color:#F5F8FA;" type="password" maxlength="20"
              class="form-control" id="signUpInputPassword" name="password" v-on:keyup='words_deal'
              onkeyup="value=value.replace(/[^\a-\z\A-\Z0-9\@\.\-\*]/g,'')"
              onpaste="value=value.replace(/[^\a-\z\A-\Z0-9\@\.\-\*]/g,'')"
              oncontextmenu="value=value.replace(/[^\a-\z\A-\Z0-9\@\.\-\*]/g,'')">
            <div class="textContent-span-wrapper">
              <span class="textContent-span textContent-span-warning textContent-span-hidden">字數已達上限!</span>
              <span class="textContent-span textContent-span-hidden"></span>
            </div>
          </div>
          <div class="form-row setting-form-row">
            <input v-model="user.checkPassword" style="background-color:#F5F8FA;" type="password" maxlength="20"
              class="form-control" id="signUpInputCheckPassword" name="checkPassword" v-on:keyup='words_deal'
              onkeyup="value=value.replace(/[^\a-\z\A-\Z0-9\@\.\-\*]/g,'')"
              onpaste="value=value.replace(/[^\a-\z\A-\Z0-9\@\.\-\*]/g,'')"
              oncontextmenu="value=value.replace(/[^\a-\z\A-\Z0-9\@\.\-\*]/g,'')">
            <div class="textContent-span-wrapper">
              <span class="textContent-span textContent-span-warning textContent-span-hidden">字數已達上限!</span>
              <span class="textContent-span textContent-span-hidden"></span>
            </div>
          </div>
          <button type="submit" class="btn setting-form-btn btn-orange" v-bind:disabled="isProcessing">儲存</button>
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
import { mapState } from 'vuex'

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
      isProcessing: false,
      isSettingPage: true,
      allowedSymbols: '@.*-',
      allowedNumbers: '0123456789',
      allowedUpperChars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      allowedLowerChars: 'abcdefghijklmnopqrstuvwxyz',
    }
  },
  methods: {
    async fetchUser() {
      try {
        const userId = this.currentUser.id
        const response = await usersAPI.getUser({ userId })
        if (response.status !== 200) {
          throw new Error()
        }
        const data = response.data
        this.user = {
          ...data,
        }
      } catch (error) {
        console.warn(error)
        Toast.fire({
          icon: 'error',
          title: '暫時無法讀取使用者資料，請稍後再試',
          timer: 2000,
        })
      }
    },
    async handleSubmit() {
      Toast.fire({
        icon: 'error',
        title: '請勿更改「帳戶設定」，謝謝您',
        timer: 2000,
      })
      // try {
      //   if (!this.user.name || !this.user.email || !this.user.account) {
      //     Toast.fire({
      //       icon: 'warning',
      //       title: 'Name、Email、Account 不可為空白'
      //     })
      //     return
      //   }
      //   if (this.user.password !== this.user.checkPassword) {
      //     this.user.password = ''
      //     this.user.checkPassword = ''
      //     Toast.fire({
      //       icon: 'warning',
      //       title: 'password, checkPassword 不一致'
      //     })
      //     return
      //   }

      //   // 檢查 account、email、name、password 輸入內容長度，避免使用者移除 input 的 maxlength="20"or"50" 屬性
      //   const maxlengthErrorMessages = []
      //   if (this.user.name.length > 20) {
      //     maxlengthErrorMessages.push('Name')
      //   }
      //   if (this.user.email.length > 50) {
      //     maxlengthErrorMessages.push('Email')
      //   }
      //   if (this.user.account.length > 20) {
      //     maxlengthErrorMessages.push('Account')
      //   }
      //   if (this.user.password) {
      //     if (this.user.password.length > 20) {
      //       maxlengthErrorMessages.push('Password')
      //     }
      //   }
      //   if (maxlengthErrorMessages.length > 0) {
      //     let title = ''
      //     maxlengthErrorMessages.forEach(message => {
      //       title += `${message} `
      //     })
      //     title += '輸入內容長度超出限制'
      //     Toast.fire({
      //       icon: 'warning',
      //       title: title
      //     })
      //     return
      //   }

      //   // 檢查 account、email、password 只允許半形大小寫英文、數字與 @*-. 符號
      //   const checkErrorMessages = []
      //   const allowChars = this.allowedSymbols + this.allowedNumbers + this.allowedUpperChars + this.allowedLowerChars
      //   function checkChars(checkObject, checkObjectName, allowChars) {
      //     for (let i = 0; i < checkObject.length; i++) {
      //       if (!allowChars.includes(checkObject[i])) {
      //         checkErrorMessages.push(`${checkObjectName}`)
      //         return
      //       }
      //     }
      //   }
      //   checkChars(this.user.account, 'Account', allowChars)
      //   checkChars(this.user.email, 'Email', allowChars)
      //   if (this.user.password) {
      //     checkChars(this.user.password, 'Password', allowChars)
      //   }
      //   if (checkErrorMessages.length > 0) {
      //     let title = ''
      //     checkErrorMessages.forEach(message => {
      //       title += `${message} `
      //     })
      //     title += '只允許半形大小寫英文、數字與 @*-. 符號'
      //     Toast.fire({
      //       icon: 'warning',
      //       title: title
      //     })
      //     return
      //   }

      //   this.isProcessing = true
      //   const formData = {
      //     name: this.user.name,
      //     email: this.user.email,
      //     account: this.user.account,
      //     password: this.user.password,
      //     checkPassword: this.user.checkPassword
      //   }
      //   Toast.fire({
      //     icon: 'warning',
      //     title: '正在更新中，請稍後',
      //     timer: false
      //   })
      //   const response = await usersAPI.putSetting({ formData })
      //   // 根據後端回傳，此時的 data 是更新後的 user 物件
      //   const data = response.data

      //   // 如果 password、checkPassword input 的內容長度到上限，再送出之後input會清空，一併移除掉"字數已達上限!"的警告
      //   const formControls = document.querySelectorAll('.form-control')
      //   for (let i = 3; i < formControls.length; i++) {
      //     formControls[i].parentElement.children[1].children[0].classList.add('textContent-span-hidden')
      //   }

      //   // 伺服器回傳錯誤
      //   if (response.status !== 200) {
      //     throw new Error()
      //   }
      //   Toast.fire({
      //     icon: 'success',
      //     title: '更新成功'
      //   })

      //   this.user = {
      //     ...data,
      //   }
      //   this.$store.dispatch('afterPutUserInfo', {
      //     ...data,
      //   })
      //   this.isProcessing = false
      //   this.user.password = ''
      //   this.user.checkPassword = ''
      // } catch (error) {
      //   this.isProcessing = false
      //   let title = '更新失敗，請稍後再試'
      //   // 如果後端有提供錯誤訊息，以後端為主
      //   if (error.response.data.message) {
      //     title = error.response.data.message
      //   } else if (error.response.data.errorMessages.length > 0) {
      //     title = ''
      //     error.response.data.errorMessages.forEach(errorMessage => {
      //       title += `${errorMessage}\n`
      //     })
      //   }
      //   Toast.fire({
      //     icon: 'error',
      //     title: title
      //   })
      // }
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
  },
  computed: {
    ...mapState(['currentUser', 'isAuthenticated'])
  },
  created() {
    this.fetchUser()
  },
  mounted() {
    Toast.fire({
      icon: 'warning',
      title: '更改「帳戶設定」功能，暫時關閉',
      timer: 5000,
    })
  }
}
</script>

<style>
.setting-form-wrapper {
  padding: 15px;
  border-top: 1px solid #E6ECF0;
}

.setting-form {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
}

.setting-form-row {
  position: relative;
  width: 100%;
}

.setting-form-row:nth-child(n)::before {
  position: absolute;
  bottom: 64px;
  left: 12px;
  width: 100%;
  height: 2px;
  font-weight: 500;
  font-size: 10px;
  line-height: 10px;
  color: #657786;
}

.setting-form-row:nth-child(1)::before {
  content: '帳號';
}

.setting-form-row:nth-child(2)::before {
  content: '名稱';
}

.setting-form-row:nth-child(3)::before {
  content: 'Email';
}

.setting-form-row:nth-child(4)::before {
  content: '密碼';
}

.setting-form-row:nth-child(5)::before {
  content: '密碼確認';
}

.setting-form-row::after {
  position: absolute;
  bottom: 22px;
  left: 0px;
  width: 100%;
  height: 2px;
  content: '';
  background: #657786;
  border-radius: 0px 0px 4px 4px;
}

.setting-form-row input {
  height: 52px;
  padding-top: 12px;
  padding-bottom: 0px;
  margin: 5px 0px 0px;
  border-radius: 4px 4px 0px 0px;
  /* background-color: inline-style-setting; */
}

.setting-form :nth-child(1) input {
  margin: 0px 0px;
}

.setting-form-btn {
  width: 116px;
  height: 46px;
  background: #FF6600;
  color: #FFFFFF;
  margin-top: 40px;
  border-radius: 50px;
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 26px;
}
</style>