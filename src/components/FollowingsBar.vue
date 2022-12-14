<template>
  <div class="followingsBar-wrapper">
    <div class="followingsBar-title">Popular</div>
    <div v-for="recommendedFollowing in recommendedFollowings" class="recommended-following-wrapper">
      <div class="following-info-wrapper">
        <div class="avatar-wrapper">
          <router-link class="link" v-bind:to="'/users/' + recommendedFollowing.id">
            <img v-bind:src="recommendedFollowing.avatar" alt="">
          </router-link>
        </div>
        <div class="info-wrapper">
          <router-link class="link" v-bind:to="'/users/' + recommendedFollowing.id">
            <div class="info-wrapper-name">{{ recommendedFollowing.name }}</div>
          </router-link>
          <router-link class="link" v-bind:to="'/users/' + recommendedFollowing.id">
            <div class="info-wrapper-account">@{{ recommendedFollowing.account }}</div>
          </router-link>
        </div>
      </div>
      <div class="follow-btn-wrapper">
        <button type="button" class="btn btn-orange" v-on:click="postFollowship(recommendedFollowing.id)"
          v-bind:disabled="isProcessing" v-if="!currentUser.Followings.includes(recommendedFollowing.id)">跟隨</button>
        <button type="button" class="btn btn-orange btn-isFollowed"
          v-on:click="deleteFollowship(recommendedFollowing.id)" v-bind:disabled="isProcessing" v-else>正在跟隨</button>
      </div>
    </div>
  </div>
</template>

<script>
import followshipAPI from '../api/followships'
import eventBus from "../utils/eventBus"
import { Toast } from '../utils/helpers'

export default {
  props: {
    currentUser: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      recommendedFollowings: [],
      isProcessing: false,
    }
  },
  methods: {
    async fetchRecommendedFollowings() {
      try {
        const response = await followshipAPI.getRecommendedFollowings()
        if (response.status !== 200) {
          throw new Error()
        }
        const data = response.data
        this.recommendedFollowings = data
      } catch (error) {
        console.warn(error)
      }
    },
    async postFollowship(followingId) {
      try {
        this.isProcessing = true
        const currentUserId = this.currentUser.id
        const formData = {
          userId: currentUserId,
          id: followingId
        }
        const { data } = await followshipAPI.postFollowship({ formData })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        // 更新前端畫面
        // 切換 FollowingBar 上的 "跟隨/正在跟隨" 按鈕 
        this.currentUser.Followings.push(followingId)

        // 更新前端畫面
        // 如果在 currentUser 的 Followship 畫面，使用者 post/delete Followship 後，要在 FollowshipSection 的 userFollowings(正在跟隨) 畫面上增加 userFollowingsInData 的筆數。(不需要做減少的功能，已經有做連動切換 "跟隨/正在跟隨" button 樣式 的功能，可供使用者判斷；保留該筆資料，如使用者不小心 delete Followship 時，還可以再點追蹤 button post Followship)
        if (Number(this.$route.params.id) === this.currentUser.id && this.$route.name === 'userFollowship') {
          let newUserFollowing = {}
          this.recommendedFollowings.forEach(recommendedFollowing => {
            if (recommendedFollowing.id === followingId) {
              newUserFollowing = {
                followingUser: {
                  ...recommendedFollowing,
                }
              }
            }
          })
          this.dataToBrotherFollowshipSection('post', 'atCurrentUserPage', newUserFollowing)
        }
        // 如果在其他 User 的 Followship 畫面，使用者 post/delete Followship 後，要在 FollowshipSection 的 userFollowers(跟隨者) 畫面上增加 userFollowers 的筆數。
        if (Number(this.$route.params.id) === followingId && this.$route.name === 'userFollowship') {
          let newUserFollower = {
            followerId: currentUserId,
            followerUser: {
              account: this.currentUser.account,
              avatar: this.currentUser.avatar,
              id: this.currentUser.id,
              introduction: this.currentUser.introduction,
              name: this.currentUser.name,
            },
            followingId: followingId,
          }
         this.dataToBrotherFollowshipSection('post', 'atOtherUserPage', newUserFollower)
        }
        // 如果在 currentUser 的 User.vue 畫面，在 post Followship 後，要在 UserBoard 新增"跟隨中"的數目
        if (Number(this.$route.params.id) === this.currentUser.id && this.$route.name === 'user') {
          this.$emit('after-post-followship', {
            situation: 'atCurrentUserPage',
            followingId: followingId
          })
        }
        // 如果在其他 User 的 User.vue 畫面，在 post Followship 後，要在 UserBoard 新增"跟隨者"的數目
        if (Number(this.$route.params.id) === followingId && this.$route.name === 'user') {
          this.$emit('after-post-followship', {
            situation: 'atOtherUserPage',
            followerId: currentUserId
          })
        }

        this.isProcessing = false
      } catch (error) {
        this.isProcessing = false
        console.warn(error)
      }
    },
    async deleteFollowship(followingId) {
      try {
        this.isProcessing = true
        const currentUserId = this.currentUser.id
        const { data } = await followshipAPI.deleteFollowship({ followingId })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        // 更新前端畫面
        // 切換 FollowingBar 上的 "跟隨/正在跟隨" 按鈕 
        this.currentUser.Followings = this.currentUser.Followings.map(followings => {
          if (followings !== followingId) {
            return followings
          }
        })

        // 如果在其他 User 的 Followship 畫面，使用者 post/delete Followship 後，要在 FollowshipSection 的 userFollowers(跟隨者) 畫面上減少 userFollowers 的筆數。
        if (Number(this.$route.params.id) === followingId && this.$route.name === 'userFollowship') {
          let deleteUserFollower = {
            followerId: currentUserId,
            followingId: followingId,
          }
          this.dataToBrotherFollowshipSection('delete', 'atOtherUserPage', deleteUserFollower)
        }
        // 如果在 currentUser 的 User.vue 畫面，在 delete Followship 後，要在 UserBoard 減少"跟隨中"的數目
        if (Number(this.$route.params.id) === this.currentUser.id && this.$route.name === 'user') {
          this.$emit('after-delete-followship', {
            situation: 'atCurrentUserPage',
            followingId: followingId
          })
        }
        // 如果在其他 User 的 User.vue 畫面，在 delete Followship 後，要在 UserBoard 減少"跟隨者"的數目
        if (Number(this.$route.params.id) === followingId && this.$route.name === 'user') {
          this.$emit('after-delete-followship', {
            situation: 'atOtherUserPage',
            followerId: currentUserId
          })
        }

        this.isProcessing = false
      } catch (error) {
        this.isProcessing = false
        console.warn(error)
      }
    },
    dataToBrotherFollowshipSection(method, situation, data) {
      eventBus.$emit("emit-data", {
        method: method,
        situation: situation,
        data: data
      });
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
  object-fit: cover;
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
  top: 50%;
  transform: translateY(-50%);
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