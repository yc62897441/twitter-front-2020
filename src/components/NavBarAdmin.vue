<template>
  <div class="navbar-wrapper">
    <div class="navbar-top">
      <div class="logo-wrapper">
        <router-link to="/tweets">
          <img src="../assets/alpha_camp_logo.png" alt="">
        </router-link>
      </div>
      <router-link to="/admin/main" class="icon-wrapper">
        <img src="../assets/icon-admin-main.png" alt="">
        <span>推文清單</span>
      </router-link>
      <router-link to="/admin/users" class="icon-wrapper">
        <img src="../assets/icon-admin-users.png" alt="">
        <span>使用者列表</span>
      </router-link>
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
  props: {
    currentUser: {
      type: Object,
      required: true
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