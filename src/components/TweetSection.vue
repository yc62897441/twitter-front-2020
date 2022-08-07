<template>
  <div id="tweet-wrapper">
    <div class="tweet-user-info-layer">
      <div>
        <img v-bind:src="tweet.User.avatar" alt="">
      </div>
      <div class="user-info-wrapper">
        <div class="user-info-name">{{ tweet.User.name }}</div>
        <div class="user-info-account">@{{ tweet.User.account }}</div>
      </div>
    </div>

    <div class="tweet-description-layer">
      {{ tweet.description }}
    </div>

    <div class="tweet-date-layer">
      {{ tweet.createdAt | formatTime }}
    </div>

    <div class="tweet-interaction-layer">
      <div>{{ tweet.repliesLength }}<p>回覆</p>
      </div>
      <div>{{ tweet.likesLength }}<p>喜歡次數</p>
      </div>
    </div>

    <div class="tweet-interaction-icons-layer">
      <!-- trigger modal -->
      <img src="../assets/icon-reply.png" alt="" type="button" data-bs-toggle="modal"
        v-bind:data-bs-target="'#modal' + tweet.id">
      <img v-if="currentUser.userLikesId.includes(tweet.id)" src="../assets/icon-isLiked.png" type="button" alt=""
        v-on:click="unlikeTweet(tweet.id)">
      <img v-else src="../assets/icon-like.png" type="button" alt="" v-on:click="likeTweet(tweet.id)">
    </div>

    <ModalTweetReply v-bind:tweet="tweet" v-bind:currentUser="currentUser"
      v-on:after-post-tweet-reply="afterPostTweetReply" />
  </div>
</template>

<script>
import ModalTweetReply from './ModalTweetReply.vue'
import tweetsAPI from '../api/tweets'
import { fromNowFilter } from '../utils/mixins'
import { mapState } from 'vuex'

export default {
  components: {
    ModalTweetReply
  },
  props: {
    propsTweet: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      tweet: {},
      newTweetReply: '',
      isProcessing: false
    }
  },
  methods: {
    async handleSubmit(tweetId) {
      try {
        if (this.newTweetReply === '') {
          return
        }
        this.isProcessing = true
        const formData = {
          userId: this.currentUser.id,
          comment: this.newTweetReply,
        }
        const { data } = await tweetsAPI.postTweetReply({ formData, tweetId })
        this.$emit('after-post-tweet-reply', {
          ...data,
        })
        this.newTweetReply = ''
        this.isProcessing = false
      } catch (error) {
        this.isProcessing = false
        console.warn(error)
      }
    },
    afterPostTweetReply(payload) {
      const { TweetId } = payload
      this.tweet.repliesLength += 1
      this.$emit('after-post-tweet-reply', {
        ...payload,
      })
    },
    async likeTweet(tweetId) {
      try {
        this.isProcessing = true
        const currentUserId = this.currentUserId
        const { data } = await tweetsAPI.likeTweet({ tweetId })
        if (data.status === 'success') {
          this.currentUser.userLikesId.push(tweetId)
          this.tweet.likesLength += 1
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
        const currentUserId = this.currentUserId
        const { data } = await tweetsAPI.unlikeTweet({ tweetId })
        if (data.status === 'success') {
          this.currentUser.userLikesId = this.currentUser.userLikesId.map(userLikeId => {
            if (userLikeId !== tweetId) {
              return userLikeId
            }
          })
          this.tweet.likesLength -= 1
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
    propsTweet(newValue) {
      this.tweet = {
        ...newValue,
      }
    }
  },
  mixins: [fromNowFilter]
}
</script>

<style>
#tweet-wrapper {
  display: flex;
  flex-direction: column;
  padding: 15px;
  border-top: 1px solid #E6ECF0;
  border-bottom: 1px solid #E6ECF0;
}

.tweet-user-info-layer {
  display: flex;
  padding-bottom: 15px;
}

.tweet-user-info-layer img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
}

.user-info-wrapper {
  margin-left: 10px;
}

.user-info-name {
  font-weight: 700;
  font-size: 15px;
  line-height: 22px;
  color: #1C1C1C;
}

.user-info-account {
  font-weight: 500;
  font-size: 15px;
  line-height: 22px;
  color: #657786;
}

.tweet-description-layer {
  margin-bottom: 15px;
  font-weight: 500;
  font-size: 23px;
  line-height: 34px;
  color: #1C1C1C;
  word-break: break-all
}

.tweet-date-layer {
  margin-bottom: 15px;
  font-weight: 500;
  font-size: 15px;
  line-height: 22px;
  color: #657786;
}

.tweet-interaction-layer {
  display: flex;
  padding: 20px 0px;
  border-top: 1px solid #E6ECF0;
  border-bottom: 1px solid #E6ECF0;
  font-weight: 700;
  font-size: 19px;
  line-height: 28px;
  color: #000000;
}

.tweet-interaction-layer div {
  display: flex;
  margin-right: 20px;
}

.tweet-interaction-layer p {
  color: #657786;
  margin: 0px;
  margin-left: 5px;
}

.tweet-interaction-icons-layer {
  padding: 15px 0px 0px;
}

.tweet-interaction-icons-layer img {
  width: 25px;
  height: 25px;
  margin: 0px;
  margin-right: 155px;
  cursor: pointer;
}
</style>