<template>
  <div class="container">
    <div class="left-container">
      <Navbar class="Navbar" v-bind:currentUser="currentUser" />
    </div>

    <div class="middle-container">
      <div class="middle-container-wrapper">
        <div class="middle-container-arrow-wrapper">
          <img src="../assets/arrow-left.png" type="button" v-on:click="hasHistory" alt="">
        </div>
        <div class="middle-container-page-title-wrapper">
          <h1>推文</h1>
        </div>
      </div>

      <TweetSection v-bind:propsTweet="tweet" v-on:after-post-tweet-reply="afterPostTweetReply" />
      <RepliesSection v-bind:replies="replies" />
      <ModalNewTweet v-bind:currentUser="currentUser" />
    </div>

    <div class="right-container">
      <FollowingsBar class="FollowingsBar" v-bind:currentUser="currentUser" />
    </div>

  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import FollowingsBar from '../components/FollowingsBar.vue'
import TweetSection from '../components/TweetSection.vue'
import RepliesSection from '../components/RepliesSection.vue'
import ModalNewTweet from '../components/ModalNewTweet.vue'
import tweetsAPI from '../api/tweets'
import { mapState } from 'vuex'
import { v4 as uuidv4 } from 'uuid'
import { Toast } from '../utils/helpers'

export default {
  components: {
    Navbar,
    FollowingsBar,
    TweetSection,
    RepliesSection,
    ModalNewTweet
  },
  data() {
    return {
      tweet: {},
      isProcessing: false,
      replies: []
    }
  },
  methods: {
    async fetchTweet(tweetId) {
      try {
        const id = tweetId
        const response = await tweetsAPI.getTweet({ id })
        if (response.status !== 200) {
          throw new Error()
        }
        const data = response.data
        this.tweet = data
      } catch (error) {
         console.warn(error)
        Toast.fire({
          icon: 'error',
          title: '找不到該則 Tweet',
          timer: 2000,
        })
        this.$router.push({ name: 'not-found' })
        setTimeout(() => {
          this.$router.go(-2)
        }, 1000)
      }
    },
    async getTweetReplies(tweetId) {
      try {
        const { data } = await tweetsAPI.getTweetReplies({ tweetId })
        this.replies = data
      } catch (error) {
        console.warn(error)
      }
    },
    afterPostTweetReply(payload) {
      this.replies.unshift({
        TweetId: payload.TweetId,
        UserId: payload.UserId,
        comment: payload.comment,
        createdAt: payload.createdAt,
        id: payload.id,
        updatedAt: payload.updatedAt,
        User: {
          id: this.currentUser.id,
          name: this.currentUser.name,
          account: this.currentUser.account,
          avatar: this.currentUser.avatar,
        },
        Tweet: {
          User: {
            account: this.tweet.User.account
          }
        }
      })
    },
    hasHistory() {
      this.$router.go(-1)
    },
  },
  computed: {
    ...mapState(['currentUser'])
  },
  mounted() {
    const tweetId = this.$route.params.id
    this.fetchTweet(tweetId)
    this.getTweetReplies(tweetId)
  },
  beforeRouteUpdate(to, from, next) {
    const tweetId = to.params.id
    this.fetchTweet(tweetId)
    this.getTweetReplies(tweetId)
    next()
  }
}
</script>
