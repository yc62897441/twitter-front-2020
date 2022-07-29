<template>
  <div class="container">
    <div class="left-container">
      <Navbar class="Navbar" v-bind:isProcessing="isProcessing" />
    </div>

    <div class="middle-container">
      <h1><img src="../assets/arrow-left.png" alt=""> 推文</h1>
      <TweetSection />
      <RepliesSection />
    </div>

    <div class="right-container">
      <FollowingsBar class="FollowingsBar" v-bind:isProcessing="isProcessing" />
    </div>

  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import FollowingsBar from '../components/FollowingsBar.vue'
import TweetSection from '../components/TweetSection.vue'
import RepliesSection from '../components/RepliesSection.vue'
import tweetsAPI from '../api/tweets'
import { v4 as uuidv4 } from 'uuid'

export default {
  components: {
    Navbar,
    FollowingsBar,
    TweetSection,
    RepliesSection
  },
  data() {
    return {
      tweets: [],
      isProcessing: false
    }
  },
  methods: {
    async fetchTweets() {
      try {
        const response = await tweetsAPI.getTweets()
        const data = response.data
        this.tweets = data
      } catch (error) {
        console.warn(error)
      }
    },
    async afterCreateTweet(payload) {
      try {
        this.isProcessing = true
        const { UserId, description } = payload
        const formData = {
          UserId: UserId,
          description: description,
        }
        const { data } = await tweetsAPI.postTweet({ formData })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.tweets.push({
          id: uuidv4(),
          UserId: UserId,
          description: description,
          createdAt: new Date(),
        })
        this.isProcessing = false
      } catch (error) {
        this.isProcessing = false
        console.warn(error)
      }
    }
  },
  created() {
    this.fetchTweets()
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