<template>
  <div>
    <div v-for="userFollowing in userFollowings" class="followship-user-wrapper">
      <div class="followship-user-avatar-wrapper">
        <img v-bind:src="userFollowing.followingUser.avatar" alt="">
      </div>
      <div class="followship-user-main-wrapper">
        <div class="followship-user-main-wrapper-top">
          <div class="followship-user-main-wrapper-top-left">
            <div class="followship-user-name">{{ userFollowing.followingUser.name }}</div>
            <div class="followship-user-account">@{{ userFollowing.followingUser.account }}</div>
          </div>
          <div class="followship-user-main-wrapper-top-right followship-btn-wrapper">
            <button type="button" class="btn btn-orange" v-on:click="postFollowship(userFollowing.followingUser.id)"
              v-bind:disabled="isProcessing"
              v-if="!userFollowingIds.includes(userFollowing.followingUser.id)">跟隨</button>
            <button type="button" class="btn btn-orange btn-isFollowed"
              v-on:click="deleteFollowship(userFollowing.followingUser.id)" v-bind:disabled="isProcessing"
              v-else>正在跟隨</button>
          </div>
        </div>
        <div class="followship-user-main-wrapper-bottom">
          <div class="followship-user-main-wrapper-introduction">{{ userFollowing.followingUser.introduction }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import followshipAPI from '../api/followships'

export default {
  props: {
    userFollowings: {
      type: Array,
    }
  },
  data() {
    return {
      isProcessing: false,
      userId: 1,
      userFollowingIds: [],
    }
  },
  methods: {
    async postFollowship(followingId) {
      try {
        this.isProcessing = true
        const userId = 1
        const formData = {
          userId: userId,
          id: followingId
        }
        const { data } = await followshipAPI.postFollowship({ formData })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        // 更新前端畫面
        this.userFollowingIds.push(followingId)
        this.isProcessing = false
      } catch (error) {
        this.isProcessing = false
        console.warn(error)
      }
    },
    async deleteFollowship(followingId) {
      try {
        this.isProcessing = true
        const userId = 1
        const { data } = await followshipAPI.deleteFollowship({ followingId })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        // 更新前端畫面
        this.userFollowingIds = this.userFollowingIds.map(userFollowingId => {
          if (userFollowingId !== followingId) {
            return userFollowingId
          }
        })
        this.isProcessing = false
      } catch (error) {
        this.isProcessing = false
        console.warn(error)
      }
    }
  },
  watch: {
    userFollowings(newValue) {
      this.userFollowingIds = newValue.map(item => item.followingUser.id)
    },
  },
  created() {
    this.fetchRecommendedFollowings()
  }
}
</script>

<style>
.followship-user-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 60px;
  padding: 35px 0px;
  padding-left: 15px;
  border-bottom: 1px solid #E6ECF0;
}

.followship-user-avatar-wrapper img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.followship-user-main-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 10px;
  margin-left: 10px;
}

.followship-user-main-wrapper-top {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.followship-user-main-wrapper-top-left {
  display: flex;
  flex-direction: column;
}

.followship-user-name {
  font-weight: 700;
  font-size: 15px;
  line-height: 15px;
  color: #1C1C1C;
}

.followship-user-account {
  margin-top: 5px;
  font-weight: 700;
  font-size: 15px;
  line-height: 15px;
  color: #657786;
}

.followship-btn-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0px;
  padding: 0px;
  height: 100%;
}

.followship-btn-wrapper .btn {
  position: absolute;
  top: 0px;
  right: 15px;
  height: 25px;
  width: 60px;
  margin: 0px;
  padding: 0px;
  background-color: #ffffff;
  border: 1px solid #FF6600;
  border-radius: 100px;
  color: #FF6600;
}

.followship-btn-wrapper .btn-isFollowed {
  width: 100px;
  background: #FF6600;
  border: 1px solid #FF6600;
  color: #ffffff;
}

.followship-user-main-wrapper-introduction {
  font-weight: 500;
  font-size: 15px;
  line-height: 22px;
  color: #1C1C1C;
}
</style>