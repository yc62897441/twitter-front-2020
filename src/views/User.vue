<template>
  <div class="container">
    <div class="left-container">
      <Navbar class="Navbar" v-bind:currentUser="currentUser" />
    </div>

    <div class="middle-container">
      <div class="middle-container-wrapper">
        <div class="middle-container-arrow-wrapper">
          <router-link to="/tweets">
            <img src="../assets/arrow-left.png" alt="">
          </router-link>
        </div>
        <div class="middle-container-page-title-wrapper">
          <h1>{{ user.name }}</h1>
          <h3>{{ user.repliesLength }}則推文</h3>
        </div>
      </div>
      <UserBoard v-bind:propsUser="user" v-bind:currentUser="currentUser" v-on:after-put-userInfo="afterPutUserInfo" />
      <UserNavPills v-on:after-change-user-nav-pills="afterChangeUserNavPills" />
      <TweetsSection class="User-TweetsSection" v-bind:propsTweets="tweets" />
      <RepliesSection class="User-RepliesSection User-Section-hidden" v-bind:replies="replies" />
      <LikesSection class="User-LikesSection User-Section-hidden" v-bind:prosLikes="likes" />
      <ModalNewTweet v-bind:currentUser="currentUser" v-on:after-post-new-tweet="afterPostNewTweet" />
    </div>

    <div class="right-container">
      <FollowingsBar class="FollowingsBar" v-bind:currentUser="currentUser" />
    </div>

  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import FollowingsBar from '../components/FollowingsBar.vue'
import UserBoard from '../components/UserBoard.vue'
import UserNavPills from '../components/UserNavPills.vue'
import TweetsSection from '../components/TweetsSection.vue'
import RepliesSection from '../components/RepliesSection.vue'
import LikesSection from '../components/LikesSection.vue'
import ModalNewTweet from '../components/ModalNewTweet.vue'
import usersAPI from '../api/users'
import tweetsAPI from '../api/tweets'
import { mapState } from 'vuex'
import { v4 as uuidv4 } from 'uuid'
import { Toast } from '../utils/helpers'

export default {
  components: {
    Navbar,
    FollowingsBar,
    UserBoard,
    UserNavPills,
    TweetsSection,
    RepliesSection,
    LikesSection,
    ModalNewTweet,
  },
  data() {
    return {
      user: {},
      tweets: [],
      replies: [],
      likes: [],
    }
  },
  methods: {
    async fetchUser(userId) {
      try {
        const response = await usersAPI.getUser({ userId })
        const data = response.data
        this.user = {
          ...data,
        }
      } catch (error) {
        console.warn(error)
      }
    },
    async fetchUserTweets(userId) {
      try {
        const response = await usersAPI.getUserTweets({ userId })
        const data = response.data
        this.tweets = data
      } catch (error) {
        console.warn(error)
      }
    },
    async fetchReplies(userId) {
      try {
        const { data } = await usersAPI.getUserRepliedTweets({ userId })
        this.replies = data
      } catch (error) {
        console.warn(error)
      }
    },
    async fetchLikes(userId) {
      try {
        const { data } = await usersAPI.getUserLikes({ userId })
        this.likes = data
      } catch (error) {
        console.warn(error)
      }
    },
    afterChangeUserNavPills(payload) {
      const nowCheckedSection = payload.value
      const UserTweetsSection = document.querySelector('.User-TweetsSection')
      const UserRepliesSection = document.querySelector('.User-RepliesSection')
      const UserLikesSection = document.querySelector('.User-LikesSection')
      switch (nowCheckedSection) {
        case 'user-nav-pills-tweets':
          UserTweetsSection.classList.remove('User-Section-hidden')
          UserRepliesSection.classList.add('User-Section-hidden')
          UserLikesSection.classList.add('User-Section-hidden')
          break
        case 'user-nav-pills-tweetsAndReplies':
          UserTweetsSection.classList.add('User-Section-hidden')
          UserRepliesSection.classList.remove('User-Section-hidden')
          UserLikesSection.classList.add('User-Section-hidden')
          break
        case 'user-nav-pills-likes':
          UserTweetsSection.classList.add('User-Section-hidden')
          UserRepliesSection.classList.add('User-Section-hidden')
          UserLikesSection.classList.remove('User-Section-hidden')
          break
      }
    },
    afterPostNewTweet(payload) {
      this.tweets.push({
        Likes: [],
        Replies: [],
        User: {
          account: this.currentUser.account,
          avatar: this.currentUser.avatar,
          banner: this.currentUser.banner,
          id: this.currentUser.id,
          introduction: this.currentUser.introduction,
          name: this.currentUser.name,
          role: this.currentUser.role,
        },
        UserId: this.currentUser.id,
        createdAt: Date.now(),
        description: payload.description,
        id: uuidv4(),
        likesLength: 0,
        repliesLength: 0,
        updatedAt: Date.now(),
      })
      Toast.fire({
        icon: 'success',
        title: '推文發送成功'
      })
    },
    afterPutUserInfo(payload) {
      // 更新畫面上的 tweets、replies、likes、user name
      this.tweets.forEach(tweet => {
        tweet.User.name = payload.name
      })
      this.replies.forEach(reply => {
        reply.User.name = payload.name
      })
      this.likes.forEach(like => {
        if (like.Tweet.User.id === this.currentUser.id) {
          like.Tweet.User.name = payload.name
        }
      })
      this.user.name = payload.name
    },
  },
  computed: {
    ...mapState(['currentUser'])
  },
  mounted() {
    const userId = this.$route.params.id
    this.fetchUser(userId)
    this.fetchUserTweets(userId)
    this.fetchReplies(userId)
    this.fetchLikes(userId)
  },
  beforeRouteUpdate(to, from, next) {
    const userId = to.params.id
    this.fetchUser(userId)
    this.fetchUserTweets(userId)
    this.fetchReplies(userId)
    this.fetchLikes(userId)
    next()
  }
}
</script>

<style>
.User-Section-hidden {
  display: none;
}
</style>