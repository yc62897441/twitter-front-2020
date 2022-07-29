<template>
  <div class="container">
    <div class="left-container">
      <Navbar class="Navbar" />
    </div>

    <div class="middle-container">
      <TweetsSection v-bind:tweets="tweets" />
    </div>

    <div class="right-container">
      <FollowingsBar class="FollowingsBar" />
    </div>

  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import FollowingsBar from '../components/FollowingsBar.vue'
import TweetsSection from '../components/TweetsSection.vue'
import tweetsAPI from '../api/tweets'

export default {
  components: {
    Navbar,
    FollowingsBar,
    TweetsSection
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

/* .left-container {
  position: relative;
}

.Navbar {
  position: fixed;
  width: 100%
} */
</style>