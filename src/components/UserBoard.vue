<template>
  <div class="user-board-wrapper">
    <div class="user-banner-wrapper">
      <img v-bind:src="user.banner" alt="">
    </div>

    <div class="user-avatar-wrapper">
      <img v-bind:src="user.avatar" alt="">
    </div>

    <!-- trigger modal -->
    <button class="btn btn-user-info" type="button" data-bs-toggle="modal"
      v-bind:data-bs-target="'#modalUserInfo'">編輯個人資料</button>
    <div class="user-info-wrapper">
      <div class="user-info-name">{{ user.name }}</div>
      <div class="user-info-account">@{{ user.account }}</div>
      <div class="user-info-introduction">{{ user.introduction }}</div>
      <div class="user-info-followship-wrapper">
        <div class="user-info-followship-followings">{{ followingsLength }}個<p>跟隨中</p>
        </div>
        <div class="user-info-followship-followers">{{ followersLength }}位<p>跟隨者</p>
        </div>
      </div>
    </div>

    <ModalUserInfo v-bind:user="user" />
  </div>
</template>

<script>
import ModalUserInfo from './ModalUserInfo.vue'
export default {
  components: {
    ModalUserInfo
  },
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      followingsLength: '',
      followersLength: '',
    }
  },
  watch: {
    user(newValue) {
      this.followingsLength = newValue.Followings.length
      this.followersLength = newValue.Followers.length
    }
  }
}
</script>

<style>
.user-board-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 0px 0px 15px;
}

.user-banner-wrapper img {
  width: 598px;
  height: 200px;
  object-fit: cover;
}

.user-avatar-wrapper img {
  position: absolute;
  top: 124px;
  left: 14px;
  width: 140px;
  height: 140px;
  border: 4px solid #FFFFFF;
  border-radius: 50%;
  object-fit: cover;
}

.btn-user-info {
  position: absolute;
  top: 210px;
  left: 465px;
  width: 120px;
  height: 35px;
  font-weight: 700;
  font-size: 15px;
  line-height: 15px;
  color: #FF6600;
  border: 1px solid #FF6600;
  border-radius: 100px;
}

.user-info-wrapper {
  display: flex;
  flex-direction: column;
  margin: 75px 15px 0px;
}

.user-info-name {
  font-weight: 900;
  font-size: 19px;
  line-height: 28px;
  color: #1C1C1C;
}

.user-info-account {
  font-weight: 500;
  font-size: 15px;
  line-height: 22px;
  color: #657786;
}

.user-info-introduction {
  margin-top: 10px;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #000000;
}

.user-info-followship-wrapper {
  display: flex;
  flex-direction: row;
  margin-top: 10px;
}

.user-info-followship-wrapper div {
  display: flex;
  flex-direction: row;
  margin-right: 20px;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #000000;
}

.user-info-followship-wrapper p {
  color: #657786;
}
</style>