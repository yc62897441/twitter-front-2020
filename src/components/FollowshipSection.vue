<template>
  <div>
    <div v-if="show === 'userFollowings'">
      <div v-if="Number(this.$route.params.id) === currentUser.id">
        <div v-for="userFollowing in userFollowingsInData" v-bind:key="userFollowing.followingUser.id"
          class="followship-user-wrapper">
          <div class="followship-user-avatar-wrapper">
            <router-link class="link" v-bind:to="'/users/' + userFollowing.followingUser.id">
              <img v-bind:src="userFollowing.followingUser.avatar" alt="">
            </router-link>
          </div>
          <div class="followship-user-main-wrapper">
            <div class="followship-user-main-wrapper-top">
              <div class="followship-user-main-wrapper-top-left">
                <router-link class="link" v-bind:to="'/users/' + userFollowing.followingUser.id">
                  <div class="followship-user-name">{{ userFollowing.followingUser.name }}</div>
                </router-link>
                <router-link class="link" v-bind:to="'/users/' + userFollowing.followingUser.id">
                  <div class="followship-user-account">@{{ userFollowing.followingUser.account }}</div>
                </router-link>
              </div>
              <div class="followship-user-main-wrapper-top-right followship-btn-wrapper"
                v-if="Number(userFollowing.followingUser.id) !== Number(currentUser.id)">
                <button type="button" class="btn btn-orange"
                  v-on:click="postFollowship(userFollowing.followingUser.id)"
                  v-bind:disabled="isProcessing"
                  v-if="!currentUser.Followings.includes(userFollowing.followingUser.id)">跟隨</button>
                <button type="button" class="btn btn-orange btn-isFollowed"
                  v-on:click="deleteFollowship(userFollowing.followingUser.id)"
                  v-bind:disabled="isProcessing" v-else>正在跟隨</button>
              </div>
            </div>
            <div class="followship-user-main-wrapper-bottom">
              <div class="followship-user-main-wrapper-introduction">{{ userFollowing.followingUser.introduction }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div v-for="userFollowing in userFollowings" v-bind:key="userFollowing.followingUser.id"
          class="followship-user-wrapper">
          <div class="followship-user-avatar-wrapper">
            <router-link class="link" v-bind:to="'/users/' + userFollowing.followingUser.id">
              <img v-bind:src="userFollowing.followingUser.avatar" alt="">
            </router-link>
          </div>
          <div class="followship-user-main-wrapper">
            <div class="followship-user-main-wrapper-top">
              <div class="followship-user-main-wrapper-top-left">
                <router-link class="link" v-bind:to="'/users/' + userFollowing.followingUser.id">
                  <div class="followship-user-name">{{ userFollowing.followingUser.name }}</div>
                </router-link>
                <router-link class="link" v-bind:to="'/users/' + userFollowing.followingUser.id">
                  <div class="followship-user-account">@{{ userFollowing.followingUser.account }}</div>
                </router-link>
              </div>
              <div class="followship-user-main-wrapper-top-right followship-btn-wrapper"
                v-if="Number(userFollowing.followingUser.id) !== Number(currentUser.id)">
                <button type="button" class="btn btn-orange"
                  v-on:click="postFollowship(userFollowing.followingUser.id)"
                  v-bind:disabled="isProcessing"
                  v-if="!currentUser.Followings.includes(userFollowing.followingUser.id)">跟隨</button>
                <button type="button" class="btn btn-orange btn-isFollowed"
                  v-on:click="deleteFollowship(userFollowing.followingUser.id)"
                  v-bind:disabled="isProcessing" v-else>正在跟隨</button>
              </div>
            </div>
            <div class="followship-user-main-wrapper-bottom">
              <div class="followship-user-main-wrapper-introduction">{{ userFollowing.followingUser.introduction }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div v-for="userFollower in userFollowers" v-bind:key="userFollower.followerUser.id"
        class="followship-user-wrapper">
        <div class="followship-user-avatar-wrapper">
          <router-link class="link" v-bind:to="'/users/' + userFollower.followerUser.id">
            <img v-bind:src="userFollower.followerUser.avatar" alt="">
          </router-link>
        </div>
        <div class="followship-user-main-wrapper">
          <div class="followship-user-main-wrapper-top">
            <div class="followship-user-main-wrapper-top-left">
              <router-link class="link" v-bind:to="'/users/' + userFollower.followerUser.id">
                <div class="followship-user-name">{{ userFollower.followerUser.name }}</div>
              </router-link>
              <router-link class="link" v-bind:to="'/users/' + userFollower.followerUser.id">
                <div class="followship-user-account">@{{ userFollower.followerUser.account }}</div>
              </router-link>
            </div>
            <div class="followship-user-main-wrapper-top-right followship-btn-wrapper"
              v-if="Number(userFollower.followerUser.id) !== Number(currentUser.id)">
              <button type="button" class="btn btn-orange"
                v-on:click="postFollowship(userFollower.followerUser.id)" v-bind:disabled="isProcessing"
                v-if="!currentUser.Followings.includes(userFollower.followerUser.id)">跟隨</button>
              <button type="button" class="btn btn-orange btn-isFollowed"
                v-on:click="deleteFollowship(userFollower.followerUser.id)"
                v-bind:disabled="isProcessing" v-else>正在跟隨</button>
            </div>
          </div>
          <div class="followship-user-main-wrapper-bottom">
            <div class="followship-user-main-wrapper-introduction">{{ userFollower.followerUser.introduction }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import followshipAPI from '../api/followships'
import eventBus from "../utils/eventBus"

export default {
  props: {
    user: {
      type: Object,
      required: true
    },
    userFollowings: {
      type: Array,
    },
    userFollowers: {
      type: Array,
    },
    show: {
      type: String,
    },
    currentUser: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      isProcessing: false,
      userFollowingIds: [],
      // 因為 userFollowings 內的筆數，會因為使用者操作 post/delete Followship 後而增減，且更新 userFollowings(正在跟隨) 畫面上的筆數，故從 prop 拉資料到 data 以利作業
      userFollowingsInData: [],
    }
  },
  methods: {
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
        // 切換 跟隨/正在跟隨 button 
        this.currentUser.Followings.push(followingId)

        // 更新前端畫面
        // 如果在 currentUser 的 FollowshipSection 的 userFollowers(跟隨者) 畫面，則在使用者 post/delete Followship 後要增減 userFollowings(正在跟隨) 畫面上 userFollowingsInData 的筆數
        if (Number(this.$route.params.id) === this.currentUser.id && this.show === 'userFollowers') {
          let newUserFollowing = {}
          this.userFollowers.forEach(userFollower => {
            if (userFollower.followerUser.id === followingId) {
              newUserFollowing = {
                followingUser: {
                  ...userFollower.followerUser,
                }
              }
            }
          })

          // 確認 newUserFollowing 不在 userFollowingsInData 中，才新增，避免有資料筆數重複
          let isNewUserFollowingAlreadyInuserFollowingsInData = false
          this.userFollowingsInData.forEach(item => {
            if (item.followingUser.id === newUserFollowing.followingUser.id) {
              isNewUserFollowingAlreadyInuserFollowingsInData = true
            }
          })
          if (!isNewUserFollowingAlreadyInuserFollowingsInData) {
            this.userFollowingsInData.unshift(newUserFollowing)
          }
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
        const { data } = await followshipAPI.deleteFollowship({ followingId })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        // 更新前端畫面
        // 切換 跟隨/正在跟隨 button 
        this.currentUser.Followings = this.currentUser.Followings.map(followings => {
          if (followings !== followingId) {
            return followings
          }
        })

        // 更新前端畫面
        // 如果在 currentUser 的 FollowshipSection 的 userFollowers(跟隨者) 畫面，則在使用者 post/delete Followship 後要增減 userFollowings(正在跟隨) 畫面上 userFollowingsInData 的筆數
        if (Number(this.$route.params.id) === this.currentUser.id && this.show === 'userFollowers') {
          const temUserFollowings = []
          this.userFollowings.forEach(userFollowing => {
            if (userFollowing.followingUser.id !== followingId) {
              temUserFollowings.push(userFollowing)
            }
          })
          this.userFollowingsInData = temUserFollowings
        }

        this.isProcessing = false
      } catch (error) {
        this.isProcessing = false
        console.warn(error)
      }
    },
    getFromBrotherFollowingBar() {
      eventBus.$on("emit-data", (param) => {
        if (param.method === 'post') {
          // 更新前端畫面
          // 如果在 currentUser 在 FollowingBar post/delete Followship，在要 currentUser 的 FollowshipSection 的 userFollowings(正在跟隨) 畫面上，增減 userFollowingsInData 的筆數
          let newUserFollowing = {
            ...param.data,
          }

          // 確認 newUserFollowing 不在 userFollowingsInData 中，才新增，避免有資料筆數重複
          let isNewUserFollowingAlreadyInuserFollowingsInData = false
          this.userFollowingsInData.forEach(item => {
            if (item.followingUser.id === newUserFollowing.followingUser.id) {
              isNewUserFollowingAlreadyInuserFollowingsInData = true
            }
          })
          if (!isNewUserFollowingAlreadyInuserFollowingsInData) {
            this.userFollowingsInData.unshift(newUserFollowing)
          }
        }
      })
    }
  },
  watch: {
    userFollowings(newValue) {
      this.userFollowingIds = newValue.map(item => item.followingUser.id)
      if (Number(this.$route.params.id) === this.currentUser.id) {
        this.userFollowingsInData = newValue.map(item => item)
      }
    },
  },
  created: function () {
    this.getFromBrotherFollowingBar()
  },
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
  object-fit: cover;
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