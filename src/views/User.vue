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
          <h1>User name</h1>
          <h3>15 則推文</h3>
        </div>
      </div>
      <UserBoard v-bind:propsUser="user" v-bind:currentUser="currentUser" />
      <UserNavPills v-on:after-change-user-nav-pills="afterChangeUserNavPills" />
      <TweetsSection class="User-TweetsSection" v-bind:propsTweets="tweets" v-bind:currentUser="currentUser" />
      <RepliesSection class="User-RepliesSection User-Section-hidden" v-bind:replies="replies" />
      <LikesSection class="User-LikesSection User-Section-hidden" v-bind:likes="likes"
        v-bind:currentUser="currentUser" />
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
import usersAPI from '../api/users'
import tweetsAPI from '../api/tweets'
import { mapState } from 'vuex'

export default {
  components: {
    Navbar,
    FollowingsBar,
    UserBoard,
    UserNavPills,
    TweetsSection,
    RepliesSection,
    LikesSection
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
    }
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
.container {
  display: flex;
  flex-direction: row;
  padding: 0px;
  align-items: flex-start;
}

.middle-container {
  width: 600px;
  margin-left: 240px;
  margin-right: 30px;
  border-left: 1px solid #E6ECF0;
  border-right: 1px solid #E6ECF0;
}

.User-Section-hidden {
  display: none;
}
</style>