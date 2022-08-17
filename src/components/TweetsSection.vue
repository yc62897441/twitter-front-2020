<template>
  <div>
    <div v-for="tweet in tweets" :key="tweet.id" class="tweet-wrapper">
      <div class="tweet-wrapper-left">
        <router-link class="link" v-bind:to="'/users/' + tweet.User.id">
          <img v-bind:src="tweet.User.avatar" alt="">
        </router-link>
      </div>
      <div class="tweet-wrapper-right">
        <div class="tweet-info">
          <router-link class="link" v-bind:to="'/users/' + tweet.User.id">
            <div class="tweet-info-name">{{ tweet.User.name }}</div>
          </router-link>
          <router-link class="link" v-bind:to="'/users/' + tweet.User.id">
            <div class="tweet-info-account"> @{{ tweet.User.account }}</div>
          </router-link>
          <div class="tweet-info-data">・{{ tweet.createdAt | fromNow }}</div>
        </div>
        <router-link class="link" v-bind:to="'/tweets/' + tweet.id">
          <div class="tweet-description">
            {{ tweet.description }}
          </div>
        </router-link>
        <div class="tweet-interaction">
          <div>
            <!-- trigger modal -->
            <img src="../assets/icon-reply.png" alt="" type="button" data-bs-toggle="modal"
              v-bind:data-bs-target="'#modal' + tweet.id">
            <p>{{ tweet.repliesLength }}</p>
          </div>
          <div v-if="currentUser.userLikesId.includes(tweet.id)">
            <img src="../assets/icon-isLiked.png" type="button" alt="" v-on:click="unlikeTweet(tweet.id)">
            <p>{{ tweet.likesLength }}</p>
          </div>
          <div v-else>
            <img src="../assets/icon-like.png" type="button" alt="" v-on:click="likeTweet(tweet.id)">
            <p>{{ tweet.likesLength }}</p>
          </div>
        </div>
      </div>

      <ModalTweetReply v-bind:tweet="tweet" v-on:after-post-tweet-reply="afterPostTweetReply"
        v-bind:currentUser="currentUser" />
    </div>
  </div>
</template>

<script>
import { fromNowFilter } from '../utils/mixins'
import ModalTweetReply from './ModalTweetReply.vue'
import { mapState } from 'vuex'
import tweetsAPI from '../api/tweets'

export default {
  components: {
    ModalTweetReply
  },
  props: {
    propsTweets: {
      type: Array,
      required: true
    },
  },
  data() {
    return {
      tweets: [],
    }
  },
  methods: {
    afterPostTweetReply(payload) {
      const { TweetId } = payload
      this.tweets.forEach(tweet => {
        if (tweet.id === Number(TweetId)) {
          tweet.repliesLength += 1
        }
      })
      // 在自己的 User.vue，在 post reply 後，要在自己的 RepliesSection unshift 該則新回覆；在別人的 User.vue 則不用
      if (this.$router.history.current.name === 'user' && Number(this.$router.history.current.params.id) === this.currentUser.id) {
        this.$emit('after-post-tweet-reply', {
          ...payload,
        })
      }
    },
    async likeTweet(tweetId) {
      try {
        this.isProcessing = true
        let likesLength = 0
        // 向後端 post likeTweet
        const { data } = await tweetsAPI.likeTweet({ tweetId })
        if (data.status === 'success') {
          // tweet 的愛心icon 亮起
          this.currentUser.userLikesId.push(tweetId)
          // tweet 的喜歡次數 + 1
          this.tweets.forEach(tweet => {
            if (tweet.id === tweetId) {
              tweet.likesLength += 1
              likesLength = tweet.likesLength
            }
          })
        }
        // 在自己的 User.vue，在 post like 後，要在自己的 LikeSection unshift 該則 tweet；在別人的 User.vue 則不用
        if (this.$route.name === 'user' && Number(this.$route.params.id) === this.currentUser.id) {
          // 取得該則被喜歡的 tweet
          let newLikedTweet = {}
          this.tweets.forEach(tweet => {
            if (tweet.id === tweetId) {
              newLikedTweet = {
                ...tweet,
              }
            }
          })
          // 將被喜歡的 tweet，以及 tweet 的喜歡次數(likesLength)，傳給父層再處理
          this.$emit('after-like-tweet', {
            newLikedTweet: {
              ...newLikedTweet
            },
            likesLength: likesLength,
            from: 'TweetsSection',
          })
        }
        this.isProcessing = false
      } catch (error) {
        this.isProcessing = false
        console.warn(error)
      }
    },
    async unlikeTweet(tweetId) {
      try {
        this.isProcessing = true
        let likesLength = 0
        // 向後端 post unlikeTweet
        const { data } = await tweetsAPI.unlikeTweet({ tweetId })
        if (data.status === 'success') {
          // tweet 的愛心icon 熄滅
          this.currentUser.userLikesId = this.currentUser.userLikesId.map(userLikeId => {
            if (userLikeId !== tweetId) {
              return userLikeId
            }
          })
          // tweet 的喜歡次數 - 1
          this.tweets.forEach(tweet => {
            if (tweet.id === tweetId) {
              tweet.likesLength -= 1
              likesLength = tweet.likesLength
            }
          })
        }
        // 在自己的 User.vue，在 post unlike 後，要在自己的 LikeSection remove 該則 tweet；在別人的 User.vue 則不用
        if (this.$route.name === 'user' && Number(this.$route.params.id) === this.currentUser.id) {
          // 將被 unlike 的 tweet id，以及 tweet 的喜歡次數(likesLength)，傳給父層再處理
          this.$emit('after-unlike-tweet', {
            unlikeTweetId: tweetId,
            likesLength: likesLength,
            from: 'TweetsSection'
          })
        }
        this.isProcessing = false
      } catch (error) {
        this.isProcessing = false
        console.warn(error)
      }
    },
  },
  computed: {
    ...mapState(['currentUser'])
  },
  watch: {
    propsTweets(newValue) {
      this.tweets = newValue
    }
  },
  mixins: [fromNowFilter],
}
</script>

<style>
.tweet-wrapper {
  display: flex;
  padding: 15px;
  border-bottom: 1px solid #E6ECF0;
}

.tweet-wrapper-left img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
}

.tweet-wrapper-right {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-left: 10px;
}

.tweet-info,
.tweet-interaction {
  display: flex;
}

.tweet-info-name {
  margin-right: 5px;
  font-weight: 700;
  font-size: 15px;
  line-height: 22px;
  color: #1C1C1C;
}

.tweet-info-account,
.tweet-info-data {
  font-weight: 500;
  font-size: 15px;
  line-height: 22px;
  color: #657786;
}

.tweet-description {
  margin-top: 6px;
  font-weight: 500;
  font-size: 15px;
  line-height: 22px;
  color: #1C1C1C;
  word-break: break-all;
}

.tweet-interaction {
  margin-top: 14px;
  font-weight: 500;
  font-size: 13px;
  line-height: 13px;
  color: #657786;
}

.tweet-interaction div {
  display: flex;
  margin-right: 50px;
}

.tweet-interaction div img {
  width: 12px;
  height: 12px;
}

.tweet-interaction div p {
  margin: 0px;
  margin-left: 12px;
}
</style>