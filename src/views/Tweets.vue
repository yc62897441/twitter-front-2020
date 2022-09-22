<template>
  <div class="container">
    <div class="left-container">
      <Navbar class="Navbar" v-bind:currentUser="currentUser" />
    </div>

    <div class="middle-container">
      <h1>首頁</h1>
      <NewTweet v-on:after-create-tweet="afterCreateTweet" v-bind:currentUser="currentUser"
        v-bind:isProcessing="isProcessing" />
      <TweetsSection v-bind:propsTweets="tweets" v-on:load-more="loadMore"/>
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
import TweetsSection from '../components/TweetsSection.vue'
import NewTweet from '../components/NewTweet.vue'
import ModalNewTweet from '../components/ModalNewTweet.vue'
import tweetsAPI from '../api/tweets'
import { mapState } from 'vuex'
import { v4 as uuidv4 } from 'uuid'
import { Toast } from '../utils/helpers'

export default {
  components: {
    Navbar,
    FollowingsBar,
    TweetsSection,
    NewTweet,
    ModalNewTweet
  },
  data() {
    return {
      tweets: [],
      isProcessing: false,
      offset: 0
    }
  },
  methods: {
    async fetchTweets() {
      try {
        const offset = this.offset
        this.offset = this.offset + 10
        const response = await tweetsAPI.getTweets({ offset })
        if (response.status !== 200) {
          throw new Error()
        }
        const data = response.data
        data.forEach(tweet => {
          this.tweets.push(tweet)
        })
        // this.tweets = this.tweets.push(...data)
      } catch (error) {
        console.warn(error)
        Toast.fire({
          icon: 'error',
          title: '暫時無法讀取 Tweets，請稍後再試',
          timer: 2000,
        })
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
        const response = await tweetsAPI.postTweet({ formData })
        const data = response.data
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.tweets.unshift({
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
          description: description,
          id: data.tweetId,
          likesLength: 0,
          repliesLength: 0,
          updatedAt: Date.now(),
        })
        Toast.fire({
          icon: 'success',
          title: '推文發送成功'
        })
        this.isProcessing = false
      } catch (error) {
        this.isProcessing = false
        console.warn(error)
      }
    },
    afterPostNewTweet(payload) {
      this.tweets.unshift({
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
        id: payload.tweetId,
        likesLength: 0,
        repliesLength: 0,
        updatedAt: Date.now(),
      })
      Toast.fire({
        icon: 'success',
        title: '推文發送成功'
      })
    },
    loadMore() {
      this.fetchTweets()
    }
  },
  computed: {
    ...mapState(['currentUser', 'isAuthenticated'])
  },
  created() {
    this.fetchTweets()
  }
}
</script>
