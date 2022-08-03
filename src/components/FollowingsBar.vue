<template>
  <div class="followingsBar-wrapper">
    <div class="followingsBar-title">Popular</div>

    <div v-for="recommendedFollowing in recommendedFollowings" class="recommended-following-wrapper">
      <div class="following-info-wrapper">
        <div class="avatar-wrapper">
          <img v-bind:src="recommendedFollowing.avatar" alt="">
        </div>
        <div class="info-wrapper">
          <div class="info-wrapper-name">{{ recommendedFollowing.name }}</div>
          <div class="info-wrapper-account">@{{ recommendedFollowing.account }}</div>
        </div>
      </div>
      <div class="follow-btn-wrapper">
        <button type="button" class="btn btn-orange" v-on:click="postFollowship(recommendedFollowing.id)"
          v-bind:disabled="isProcessing" v-if="!recommendedFollowing.Followers.includes(userId)">跟隨</button>
        <button type="button" class="btn btn-orange btn-isFollowed"
          v-on:click="deleteFollowship(recommendedFollowing.id)" v-bind:disabled="isProcessing" v-else>正在跟隨</button>
      </div>
    </div>
  </div>
</template>

<script>
import followshipAPI from '../api/followships'

export default {
  data() {
    return {
      recommendedFollowings: [],
      isProcessing: false,
      userId: 1
    }
  },
  methods: {
    async fetchRecommendedFollowings() {
      try {
        const userId = 1 // userId 之後要改成由登入的user資料來取代
        const { data } = await followshipAPI.getRecommendedFollowings({ userId: userId })
        this.recommendedFollowings = data
      } catch (error) {
        console.warn(error)
      }
    },
    async postFollowship(followingId) {
      try {
        this.isProcessing = true
        const userId = 1
        const formData = {
          userId: userId,
          followingId: followingId
        }
        const { data } = await followshipAPI.postFollowship({ formData })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        // 更新前端畫面
        this.recommendedFollowings.forEach(recommendedFollowing => {
          if (recommendedFollowing.id === followingId) {
            recommendedFollowing.Followers.push(userId)
          }
        })
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
        this.recommendedFollowings.forEach(recommendedFollowing => {
          if (recommendedFollowing.id === followingId) {
            recommendedFollowing.Followers = recommendedFollowing.Followers.map(follower => {
              if (follower !== userId) {
                return follower
              }
            })
          }
        })
        this.isProcessing = false
      } catch (error) {
        this.isProcessing = false
        console.warn(error)
      }
    }
  },
  created() {
    this.fetchRecommendedFollowings()
  }
}
</script>

<style>
.followingsBar-wrapper {
  position: fixed;
  display: flex;
  flex-direction: column;
  width: 350px;
  height: auto;
  margin-top: 15px;
  padding: 17px 0px 5px;
  background: #F5F8FA;
  border-radius: 14px;
}

.followingsBar-title {
  margin: 10px 0px;
  margin-left: 15px;
  font-weight: 700;
  font-size: 18px;
  line-height: 26px;
  color: #1C1C1C;
}

.recommended-following-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  margin-left: 15px;
  padding: 10px 0px;
  border-top: 1px solid #E6ECF0;
}

.following-info-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.avatar-wrapper img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.info-wrapper {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
}

.info-wrapper-name {
  font-weight: 700;
  font-size: 15px;
  line-height: 15px;
  color: #1C1C1C;
}

.info-wrapper-account {
  font-weight: 700;
  font-size: 15px;
  line-height: 15px;
  color: #657786;
}

.follow-btn-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0px;
  padding: 0px;
  height: 100%;
}

.follow-btn-wrapper .btn {
  position: absolute;
  top: 0px;
  right: 15px;
  height: 35px;
  width: 60px;
  margin: 0px;
  padding: 0px;
  background-color: #ffffff;
  border: 1px solid #FF6600;
  border-radius: 100px;
  color: #FF6600;
}

.follow-btn-wrapper .btn-isFollowed {
  width: 100px;
  background: #FF6600;
  border: 1px solid #FF6600;
  color: #ffffff;
}
</style>