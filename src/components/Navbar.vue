<template>
  <div class="navbar-wrapper">
    <div class="navbar-top">
      <div class="logo-wrapper">
        <router-link to="/tweets">
          <img src="../assets/alpha_camp_logo.png" alt="">
        </router-link>
      </div>
      <div class="icon-wrapper">
        <img src="../assets/home.png" alt="">
        <span>首頁</span>
      </div>
      <div class="icon-wrapper">
        <img src="../assets/user.png" alt="">
        <span>個人資料</span>
      </div>
      <div class="icon-wrapper">
        <img src="../assets/setting.png" alt="">
        <span>設定</span>
      </div>
      <button type="submit" class="btn btn-orange" v-bind:disabled="isProcessing">推文</button>
    </div>

    <div class="navbar-bottom">
      <div class="icon-wrapper">
        <img src="../assets/logout.png" alt="">
        <span>登出</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isProcessing: {
      type: Boolean,
      required: true
    }
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
  padding: 5px 10px;
}

.logo-wrapper img {
  width: 30px;
  height: 30px;
  margin-right: 20px;
}

.icon-wrapper {
  display: flex;
  align-items: center;
  margin-top: 35px;
  border: 1px solid #ffffff;
  cursor: pointer;
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
  /* font-family: 'Noto Sans TC';
  font-style: normal; */
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