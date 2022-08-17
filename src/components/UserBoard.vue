<template>
  <div class="user-board-wrapper">
    <div class="user-banner-wrapper">
      <img v-bind:src="user.banner" alt="">
    </div>

    <div class="user-avatar-wrapper">
      <router-link class="link" v-bind:to="'/users/' + user.id">
        <img v-bind:src="user.avatar" alt="">
      </router-link>
    </div>

    <!-- trigger modal -->
    <button v-if="user.id === currentUser.id" class="btn btn-user-info" type="button" data-bs-toggle="modal"
      v-bind:data-bs-target="'#modalUserInfo'">編輯個人資料</button>
    <div v-else class="user-interaction-wrapper">
      <img class="user-interaction-wrapper-item" type="button" src="../assets/icon-messege.png" alt="">
      <img v-if="!currentUser.NotiObjs.includes(user.id)" class="user-interaction-wrapper-item" type="button"
        src="../assets/icon-noti.png" v-on:click="postNoti(user.id)" v-bind:disabled="isProcessing" alt="">
      <img v-else class="user-interaction-wrapper-item" type="button" src="../assets/icon-noti-on.png"
        v-on:click="deleteNoti(user.id)" v-bind:disabled="isProcessing" alt="">
      <button v-if="!currentUser.Followings.includes(user.id)" class="user-interaction-wrapper-item btn btn-orange"
        type="button" v-on:click="postFollowship(user.id)" v-bind:disabled="isProcessing">跟隨</button>
      <button v-else class="user-interaction-wrapper-item btn btn-orange btn-isFollowed" type="button"
        v-on:click="deleteFollowship(user.id)" v-bind:disabled="isProcessing">正在跟隨</button>
    </div>
    <div class="user-info-wrapper">
      <div class="user-info-name">{{ user.name }}</div>
      <div class="user-info-account">@{{ user.account }}</div>
      <div class="user-info-introduction">{{ user.introduction }}</div>
      <div class="user-info-followship-wrapper">
        <!-- <router-link class="link" v-bind:to="'/users/' + user.id + '/followship'"> -->
        <router-link class="link"
          v-bind:to="{ name: 'userFollowship', params: { id: user.id }, query: { show: 'followings' } }">
          <!-- <div class="user-info-followship-followings">{{ followingsLength }}個<p>跟隨中</p>
          </div> -->
          <div class="user-info-followship-followings">{{ propsUser.Followings ? propsUser.Followings.length : 0 }}個
            <p>跟隨中</p>
          </div>
        </router-link>
        <router-link class="link" v-bind:to="'/users/' + user.id + '/followship'">
          <!-- <div class="user-info-followship-followers">{{ followersLength }}位<p>跟隨者</p>
          </div> -->
          <div class="user-info-followship-followers">{{ propsUser.Followers ? propsUser.Followers.length : 0 }}位<p>
              跟隨者</p>
          </div>
        </router-link>
      </div>
    </div>

    <ModalUserInfo v-bind:propsUser="currentUser" v-on:after-put-userInfo="afterPutUserInfo" />
  </div>
</template>

<script>
import ModalUserInfo from './ModalUserInfo.vue'
import followshipAPI from '../api/followships'
import notifyAPI from '../api/notify'

export default {
  components: {
    ModalUserInfo
  },
  props: {
    propsUser: {
      type: Object,
      required: true
    },
    currentUser: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      user: {},
      followingsLength: '',
      followersLength: '',
      isProcessing: false,
    }
  },
  methods: {
    afterPutUserInfo(payload) {
      this.user = {
        ...this.user,
        ...payload,
      }
      this.$emit('after-put-userInfo', {
        ...payload,
      } )
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
        this.currentUser.Followings.push(followingId)
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
        this.currentUser.Followings = this.currentUser.Followings.map(followings => {
          if (followings !== followingId) {
            return followings
          }
        })
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
    async postNoti(notiObjId) {
      try {
        this.isProcessing = true
        const currentUserId = this.currentUser.id
        const formData = {
          userId: currentUserId,
          id: notiObjId
        }
        const { data } = await notifyAPI.postNoti({ formData })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        // 更新前端畫面
        this.currentUser.NotiObjs.push(notiObjId)
        this.isProcessing = false
      } catch (error) {
        this.isProcessing = false
        console.warn(error)
      }
    },
    async deleteNoti(notiObjId) {
      try {
        this.isProcessing = true
        const currentUserId = this.currentUser.id
        const { data } = await notifyAPI.deleteNoti({ notiObjId })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        // 更新前端畫面
        this.currentUser.NotiObjs = this.currentUser.NotiObjs.map(notiObj => {
          if (notiObj !== notiObjId) {
            return notiObj
          }
        })
        this.isProcessing = false
      } catch (error) {
        this.isProcessing = false
        console.warn(error)
      }
    },
  },
  watch: {
    propsUser(newValue) {
      this.user = {
        ...this.user,
        ...newValue,
      }
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
  padding: 0px 0px;
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

.user-interaction-wrapper {
  position: absolute;
  top: 210px;
  right: 15px;
  display: flex;
  flex-direction: row;
}

.user-interaction-wrapper img {
  width: 35px;
  height: 35px;
  margin-right: 10px;
}

.user-interaction-wrapper .btn-orange {
  margin: 0px;
  width: 60px;
  height: 35px;
  font-weight: 700;
  font-size: 15px;
  line-height: 15px;
  background-color: #ffffff;
  color: #FF6600;
  border: 1px solid #FF6600;
  border-radius: 100px;
}

.user-interaction-wrapper .btn-isFollowed {
  width: 100px;
  background-color: #FF6600;
  color: #ffffff;
  border: 1px solid #FF6600;
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