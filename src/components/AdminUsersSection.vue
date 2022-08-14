<template>
  <div class="admin-users-wrapper">
    <div class="admin-user-wrapper" v-for="user in users" :key="user.id">
      <div class="admin-user-banner-wrapper">
        <img v-bind:src="user.banner" alt="">
      </div>

      <div class="admin-user-avatar-wrapper">
        <img v-bind:src="user.avatar" alt="">
      </div>
      <div class="admin-user-info-wrapper">
        <div class="admin-user-info-name">{{user.name}}</div>
        <div class="admin-user-info-account">@{{user.account}}</div>
      </div>
      <div class="admin-user-interaction-wrapper">
        <div>
          <img src="../assets/icon-dove.png" alt="">
          <p>{{ user.tweetsNum }}</p>
        </div>
        <div>
          <img src="../assets/icon-reply.png" alt="">
          <p>{{ user.repliesNum }}</p>
        </div>
        <div>
          <img src="../assets/icon-like.png" alt="">
          <p>{{ user.likesNum }}</p>
        </div>
      </div>
      <div class="admin-user-followship-wrapper">
        <div class="admin-user-followship-followings">{{ user.followings }}個<p>跟隨中</p>
        </div>
        <div class="admin-user-followship-followers">{{ user.followers }}位<p>跟隨者</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fromNowFilter } from '../utils/mixins'
import authorizationAPI from '../api/authorization'
export default {
  props: {
    users: {
      type: Array,
      required: true
    }
  },
  mixins: [fromNowFilter],
}
</script>

<style>
.admin-users-wrapper {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 15px;
  padding: 15px;
  border-top: 1px solid #E6ECF0;
}

.admin-user-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 245px;
  height: 315px;
  padding: 0px 0px;
  background: #F6F7F8;
  border-radius: 10px;
}

.admin-user-banner-wrapper img {
  width: 245px;
  height: 140px;
  object-fit: cover;
  border-radius: 10px 10px 0px 0px;
}

.admin-user-avatar-wrapper img {
  position: absolute;
  top: 60px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 100px;
  border: 4px solid #FFFFFF;
  border-radius: 50%;
  object-fit: cover;
}

.admin-user-info-wrapper {
  display: flex;
  flex-direction: column;
  margin: 20px 0px 0px;
}

.admin-user-info-name {
  font-weight: 900;
  font-size: 15px;
  line-height: 22px;
  color: #1C1C1C;
  text-align: center;
}

.admin-user-info-account {
  font-weight: 500;
  font-size: 15px;
  line-height: 22px;
  color: #657786;
  text-align: center;
}

.admin-user-interaction-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  font-weight: 500;
  font-size: 15px;
  line-height: 15px;
  color: #1C1C1C;
}

.admin-user-interaction-wrapper div {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0px 8px;
}

.admin-user-interaction-wrapper div img {
  width: 20px;
  height: 20px;
}

.admin-user-interaction-wrapper div p {
  margin: 0px 4px;
}

.admin-user-followship-wrapper {
  display: flex;
  flex-direction: row;
  margin: 10px 0px 0px;
}

.admin-user-followship-wrapper div {
  display: flex;
  flex-direction: row;
  margin: 0px 3px;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #000000;
}

.admin-user-followship-wrapper p {
  color: #657786;
}
</style>