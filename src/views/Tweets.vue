<template>
  <div class="container">
    <div class="left-container">
      <Navbar class="Navbar" />
    </div>
    <div class="middle-container">
      <h1>Tweets</h1>
      <h1>Tweets</h1>
      <h1>Tweets</h1>
      <h1>Tweets</h1>
      <h1>Tweets</h1>
      <h1>Tweets</h1>
      <h1>Tweets</h1>
      <h1>Tweets</h1>
      <h1>Tweets</h1>
      <h1>Tweets</h1>
      <h1>Tweets</h1>
      <h1>Tweets</h1>
      <h1>Tweets</h1>
      <h1>Tweets</h1>
      <h1>Tweets</h1>
      <h1>Tweets</h1>
      <h1>Tweets</h1>
      <h1>Tweets</h1>
      <h1>Tweets</h1>
      <h1>Tweets</h1>
    </div>

    <div class="right-container">
      <FollowingsBar class="FollowingsBar" />
    </div>

  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import FollowingsBar from '../components/FollowingsBar.vue'
import tweetsAPI from '../api/tweets'

export default {
  components: {
    Navbar,
    FollowingsBar,
  },
  data() {
    return {
      tweets: []
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
  border: 2px solid red;
  padding: 0px;
  align-items: flex-start;
}

.middle-container {
  margin-left: 240px;
  width: 600px;
}

/* .left-container {
  position: relative;
}

.Navbar {
  position: fixed;
  width: 100%
} */
</style>