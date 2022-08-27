<template>
  <div class="navbar-wrapper">
    <div class="navbar-top">
      <div class="logo-wrapper">
        <router-link to="/tweets">
          <img src="../assets/alpha_camp_logo.png" alt="">
        </router-link>
      </div>
      <router-link to="/tweets" class="icon-wrapper">
        <img src="../assets/home.png" alt="">
        <span>首頁</span>
      </router-link>
      <router-link to="/notices" class="icon-wrapper">
        <img src="../assets/icon-noti-nocolor.png" alt="">
        <span>通知</span>
      </router-link>
      <router-link to="/chat" class="icon-wrapper">
        <img src="../assets/icon-messege-nocolor.png" alt="">
        <span>公開聊天室</span>
      </router-link>
      <router-link to="/chat_private" class="icon-wrapper">
        <img src="../assets/icon-messege-nocolor.png" alt="">
        <span>私人聊天室</span>
        <div class="red-spot red-spot-hidden"></div>
      </router-link>
      <router-link v-bind:to="'/users/' + currentUser.id" class="icon-wrapper">
        <img src="../assets/user.png" alt="">
        <span>個人資料</span>
      </router-link>
      <router-link to="/setting" class="icon-wrapper">
        <img src="../assets/setting.png" alt="">
        <span>設定</span>
      </router-link>

      <!-- trigger modal -->
      <button class="btn btn-orange navbar-btn" type="button" data-bs-toggle="modal"
        v-bind:data-bs-target="'#modalNewTweet'" v-bind:disabled="isSettingPage">推文</button>
    </div>

    <div class="navbar-bottom">
      <div class="icon-wrapper" v-on:click="logout">
        <img src="../assets/logout.png" alt="">
        <span>登出</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from '../utils/helpers'
import eventBus from "../utils/eventBus"

export default {
  props: {
    currentUser: {
      type: Object,
      required: true
    },
    isSettingPage: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    logout() {
      this.$store.commit('revokeAuthentication')
      this.$router.push('/signin')
      Toast.fire({
        icon: 'success',
        title: '成功登出'
      })
    },
    getFromBrotherTest() {
      eventBus.$on("showRedSpot", (param) => {
        const redSpot = document.querySelector('.red-spot')
        redSpot.classList.remove('red-spot-hidden')
      })
    }
  },
  created() {
    this.getFromBrotherTest()
  }
}
</script>

<style>
.navbar-wrapper {
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 235px;
  height: 100vh;
  padding: 17px 0px;
}

.logo-wrapper,
.icon-wrapper {
  display: flex;
  align-items: center;
  padding: 5px 10px;
  border: 1px solid #ffffff;
}

.logo-wrapper img {
  width: 30px;
  height: 30px;
}

.icon-wrapper {
  margin-top: 35px;
  cursor: pointer;
  text-decoration: none;
}

.icon-wrapper:hover {
  background-color: #f6f6f6;
  border-color: #eeeeee;
  border-radius: 18px;
}

.icon-wrapper img {
  width: 24px;
  height: 24px;
  margin-right: 20px;
}

.icon-wrapper span {
  font-weight: 700;
  font-size: 18px;
  line-height: 26px;
  color: #1C1C1C;
}

.navbar-btn {
  margin-top: 25px;
  width: 210px;
  height: 38px;
  border-radius: 100px;
}

.navbar-btn:disabled {
  background-color: var(--orange);
  color: var(--white);
  border: 1px solid var(--orange);
}

/* 有新聊天訊息或通知，顯示的紅點 */
.red-spot {
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: firebrick;
  border-radius: 50%;
  transform: translate(200%, -80%);
}

.red-spot-hidden {
  visibility: hidden;
}
</style>