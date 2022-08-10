<template>
  <div class="container">
    <div class="left-container">
      <Navbar class="Navbar" v-bind:currentUser="currentUser" />
    </div>

    <div class="middle-container">
      <h1>首頁</h1>
      <NewTweet v-on:after-create-tweet="afterCreateTweet" v-bind:currentUser="currentUser"
        v-bind:isProcessing="isProcessing" />
      <TweetsSection v-bind:propsTweets="tweets" />
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
          id: uuidv4(),
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
  },
  computed: {
    ...mapState(['currentUser', 'isAuthenticated'])
  },
  created() {
    this.fetchTweets()
  }
}
</script>
