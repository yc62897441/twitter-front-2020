<template>
  <div>
    <div v-for="like in likes" v-bind:key="like.id" class="like-wrapper">
      <div class="like-wrapper-left">
        <router-link class="link" v-bind:to="'/users/' + like.Tweet.User.id">
          <img v-bind:src="like.Tweet.User.avatar" alt="">
        </router-link>
      </div>
      <div class="like-wrapper-right">
        <div class="like-tweet-info">
          <router-link class="link" v-bind:to="'/users/' + like.Tweet.User.id">
            <div class="like-tweet-info-name"> {{ like.Tweet.User.name }}</div>
          </router-link>
          <router-link class="link" v-bind:to="'/users/' + like.Tweet.User.id">
            <div class="like-tweet-info-account"> @{{ like.Tweet.User.account }}</div>
          </router-link>
          <div class="like-tweet-info-data">・{{ like.Tweet.createdAt | fromNow }} </div>
        </div>
        <router-link class="link" v-bind:to="'/tweets/' + like.Tweet.id">
          <div class="like-tweet-description">
            {{ like.Tweet.description }}
          </div>
        </router-link>
        <div class="like-interaction">
          <div>
            <!-- trigger modal -->
            <!-- 改用 ModalTweetReplyLikesSection，使用 ModalTweetReply 時，在 LikesSection 點擊 trigger modal，如果該 tweet 的 user 是 currentUser 則 Modal 不會顯示只會有灰幕-->
            <!-- <img src="../assets/icon-reply.png" alt="" type="button" data-bs-toggle="modal"
              v-bind:data-bs-target="'#modal' + like.Tweet.id"> -->
            <img src="../assets/icon-reply.png" alt="" type="button" data-bs-toggle="modal"
              v-bind:data-bs-target="'#modalTweetReplyLikesSection' + like.Tweet.id">
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
      <!-- <ModalTweetReply v-bind:tweet="like.Tweet" v-bind:currentUser="currentUser"
        v-on:after-post-tweet-reply="afterPostTweetReply" /> -->
      <ModalTweetReplyLikesSection v-bind:tweet="like.Tweet" v-bind:currentUser="currentUser"
        v-on:after-post-tweet-reply="afterPostTweetReply" />
    </div>
  </div>
</template>

<script>
import tweetsAPI from '../api/tweets'
import ModalTweetReply from './ModalTweetReply.vue'
import ModalTweetReplyLikesSection from './ModalTweetReplyLikesSection.vue'
import { fromNowFilter } from '../utils/mixins'
import { mapState } from 'vuex'

export default {
  components: {
    ModalTweetReply,
    ModalTweetReplyLikesSection,
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
        let likesLength = 0
        // 向後端 post likeTweet
        const { data } = await tweetsAPI.likeTweet({ tweetId })
        if (data.status === 'success') {
          // tweet 的愛心icon 亮起
          this.currentUser.userLikesId.push(tweetId)
           // tweet 的喜歡次數 + 1
          this.likes.forEach(like => {
            if (like.Tweet.id === tweetId) {
              like.Tweet.likesLength += 1
              likesLength = like.Tweet.likesLength
            }
          })
        }
        // 在自己的 User.vue，在 post like 後，要在自己的 TweetsSection 亮起該則 tweet 的愛心icon；在別人的 User.vue 則不用
        if (this.$route.name === 'user' && Number(this.$route.params.id) === this.currentUser.id) {
          // 將被喜歡的 tweet，以及 tweet 的喜歡次數(likesLength)，傳給父層再處理
          this.$emit('after-like-tweet', {
            likeTweetId: tweetId,
            likesLength: likesLength,
            from: 'LikesSection'
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
          this.likes.forEach(like => {
            if (like.Tweet.id === tweetId) {
              like.Tweet.likesLength -= 1
              likesLength = like.Tweet.likesLength
            }
          })
        }
        // 在自己的 User.vue，在 delete like 後，要在自己的 TweetsSection 熄滅該則 tweet 的愛心icon；在別人的 User.vue 則不用
        if (this.$route.name === 'user' && Number(this.$route.params.id) === this.currentUser.id) {
          // 將被 unlike 的 tweet id，以及 tweet 的喜歡次數(likesLength)，傳給父層再處理
          this.$emit('after-unlike-tweet', {
            unlikeTweetId: tweetId,
            likesLength: likesLength,
            from: 'LikesSection'
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
      // 在自己的 User.vue，在 post reply 後，要在自己的 RepliesSection unshift 該則新回覆；在別人的 User.vue 則不用
      if (this.$router.history.current.name === 'user' && Number(this.$router.history.current.params.id) === this.currentUser.id) {
        this.$emit('after-post-tweet-reply', {
          ...payload,
        })
      }
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

.like-tweet-info-name {
  margin-right: 5px;
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
  margin: 0px;
  margin-left: 12px;
}

.like-interaction-liked-p {
  color: #E0245E;
}
</style>