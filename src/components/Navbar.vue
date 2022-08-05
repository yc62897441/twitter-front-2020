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
      <router-link v-bind:to="'/users/' + currentUserId" class="icon-wrapper">
        <img src="../assets/user.png" alt="">
        <span>個人資料</span>
      </router-link>
      <router-link to="/setting" class="icon-wrapper">
        <img src="../assets/setting.png" alt="">
        <span>設定</span>
      </router-link>

      <!-- trigger modal -->
      <button class="btn btn-orange" type="button" data-bs-toggle="modal"
        v-bind:data-bs-target="'#modalNewTweet'">推文</button>
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
export default {
  data() {
    return {
      currentUserId: 1,
    }
  },
  methods: {
    logout() {
      this.$store.commit('revokeAuthentication')
      this.$router.push('/signin')
    },
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

.btn-orange {
  margin-top: 25px;
  width: 210px;
  height: 38px;
  border-radius: 100px;
}
</style>