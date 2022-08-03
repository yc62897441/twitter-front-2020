<template>
  <div class="container">
    <div class="left-container">
      <Navbar class="Navbar" />
    </div>

    <div class="middle-container">
      <h1>User name</h1>
      <h3> 15 則推文</h3>
      <UserBoard v-bind:propsUser="user" />
      <UserNavPills />
      <!-- <TweetsSection v-bind:tweets="tweets" /> -->
      <!-- <RepliesSection v-bind:replies="replies"/> -->
      <LikesSection v-bind:likes="likes" />
    </div>

    <div class="right-container">
      <FollowingsBar class="FollowingsBar" />
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
      userId: 1,
      user: {},
      tweets: [],
      replies: [],
      likes: [],
    }
  },
  methods: {
    async fetchUser() {
      try {
        const userId = this.userId
        const response = await usersAPI.getUser({ userId })
        const data = response.data
        this.user = {
          ...data,
        }
      } catch (error) {
        console.warn(error)
      }
    },
    async fetchTweets() {
      try {
        const response = await tweetsAPI.getTweets()
        const data = response.data
        this.tweets = data
      } catch (error) {
        console.warn(error)
      }
    },
    async fetchReplies() {
      try {
        const userId = this.userId
        const { data } = await usersAPI.getUserRepliedTweets({userId})
        this.replies = data
      } catch (error) {
        console.warn(error)
      }
    },
    async fetchLikes() {
      try {
        const userId = this.userId
        const { data } = await usersAPI.getUserLikes({ userId })
        this.likes = data
      } catch (error) {
        console.warn(error)
      }
    },
  },
  created() {
    this.fetchUser()
    this.fetchTweets()
    this.fetchReplies()
    this.fetchLikes()
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
</style>