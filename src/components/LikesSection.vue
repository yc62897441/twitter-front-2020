<template>
  <div>
    <div v-for="like in likes" v-bind:key="like.id" class="like-wrapper">
      <div class="like-wrapper-left">
        <img v-bind:src="like.Tweet.User.avatar" alt="">
      </div>
      <div class="like-wrapper-right">
        <div class="like-tweet-info">
          <div class="like-tweet-info-name"> {{ like.Tweet.User.name }} </div>
          <div class="like-tweet-info-account"> @{{ like.Tweet.User.account }} </div>
          <div class="like-tweet-info-data">・{{ like.Tweet.createdAt | fromNow }} </div>
        </div>
        <div class="like-tweet-description">
          {{ like.Tweet.description }}
        </div>
        <div class="like-interaction">
          <div>
            <!-- trigger modal -->
            <img src="../assets/icon-reply.png" alt="" type="button" data-bs-toggle="modal"
              v-bind:data-bs-target="'#modal' + like.Tweet.id">
            <p>{{ like.Tweet.repliesLength }}</p>
          </div>
          <div v-if="currentUser.userLikesId.includes(like.Tweet.id)">
            <img src="../assets/icon-isLiked.png" alt="" type="button" v-on:click="unlikeTweet(like.Tweet.id)">
            <p class="like-interaction-liked-p">{{ like.Tweet.likesLength }}</p>
          </div>
          <div v-else>
            <img src="../assets/icon-like.png" alt="" type="button" v-on:click="likeTweet(like.Tweet.id)">
            <p>{{ like.Tweet.likesLength }}</p>
          </div>
        </div>
      </div>
      <ModalTweetReply v-bind:tweet="like.Tweet" v-bind:currentUser="currentUser"
        v-on:after-post-tweet-reply="afterPostTweetReply" />
    </div>
  </div>
</template>

<script>
import tweetsAPI from '../api/tweets'
import ModalTweetReply from './ModalTweetReply.vue'
import { fromNowFilter } from '../utils/mixins'
import { mapState } from 'vuex'

export default {
  components: {
    ModalTweetReply
  },
  props: {
    prosLikes: {
      type: Array,
    },
  },
  data() {
    return {
      likes: [],
      isProcessing: false,
    }
  },
  methods: {
    async likeTweet(tweetId) {
      try {
        this.isProcessing = true
        const currentUserId = this.currentUser.id
        const { data } = await tweetsAPI.likeTweet({ tweetId })
        if (data.status === 'success') {
          this.likes.forEach(like => {
            if (like.Tweet.id === tweetId) {
              like.Tweet.likesLength += 1
            }
          })
          this.currentUser.userLikesId.push(tweetId)
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
        const currentUserId = this.currentUser.id
        const { data } = await tweetsAPI.unlikeTweet({ tweetId })
        if (data.status === 'success') {
          this.likes.forEach(like => {
            if (like.Tweet.id === tweetId) {
              like.Tweet.likesLength -= 1
            }
          })
          this.currentUser.userLikesId = this.currentUser.userLikesId.map(userLikeId => {
            if (userLikeId !== tweetId) {
              return userLikeId
            }
          })
        }
        this.isProcessing = false
      } catch (error) {
        this.isProcessing = false
        console.warn(error)
      }
    },
    afterPostTweetReply(payload) {
      const { TweetId } = payload
      this.likes.forEach(like => {
        if (like.Tweet.id === Number(TweetId)) {
          like.Tweet.repliesLength += 1
        }
      })
    },
  },
  computed: {
    ...mapState(['currentUser'])
  },
  watch: {
    prosLikes(newValue) {
      this.likes = newValue
    },
  },
  mixins: [fromNowFilter]
}
</script>

<style>
.like-wrapper {
  display: flex;
  padding: 15px;
  border-bottom: 1px solid #E6ECF0;
}

.like-wrapper-left img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
}

.like-wrapper-right {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
}

.like-tweet-info {
  display: flex;
}

.like-tweet-info :nth-child(1) {
  margin-right: 5px;
}

.like-tweet-info-name {
  font-weight: 700;
  font-size: 15px;
  line-height: 22px;
  color: #1C1C1C;
}

.like-tweet-info-account,
.like-tweet-info-data {
  font-weight: 500;
  font-size: 15px;
  line-height: 22px;
  color: #657786;
}

.like-tweet-description {
  margin-top: 6px;
  font-weight: 400;
  font-size: 15px;
  line-height: 22px;
  color: #1C1C1C;
  word-break: break-all
}

.like-interaction {
  display: flex;
}

.like-interaction {
  margin-top: 14px;
  font-weight: 500;
  font-size: 13px;
  line-height: 13px;
  color: #657786;
}

.like-interaction div {
  display: flex;
  margin-right: 50px;
}

.like-interaction div img {
  width: 12px;
  height: 12px;
}

.like-interaction div p {
  margin-left: 12px;
}

.like-interaction-liked-p {
  color: #E0245E;
}
</style>