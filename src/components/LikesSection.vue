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
          {{ like.Tweet.description }} Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit
          officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
        </div>
        <div class="like-interaction">
          <div>
            <!-- trigger modal -->
            <img src="../assets/icon-reply.png" alt="" type="button" data-bs-toggle="modal"
              v-bind:data-bs-target="'#modal' + like.Tweet.id">
            <p>{{ like.Tweet.Replies.length }}</p>
          </div>
          <div v-if="userLikesId.includes(like.id)">
            <img src="../assets/icon-isLiked.png" alt="" type="button" v-on:click="unlikeTweet(like.Tweet.id, like.id)">
            <p class="like-interaction-liked-p">{{ like.Tweet.Likes.length }}</p>
          </div>
          <div v-else>
            <img src="../assets/icon-like.png" alt="" type="button" v-on:click="likeTweet(like.Tweet.id, like.id )">
            <p>{{ like.Tweet.Likes.length }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import tweetsAPI from '../api/tweets'
import { fromNowFilter } from '../utils/mixins'

export default {
  props: {
    likes: {
      type: Array,
    },
  },
  data() {
    return {
      userId: 1,
      isProcessing: false,
      userLikesId: []
    }
  },
  methods: {
    async likeTweet(tweetId, likeId) {
      try {
        this.isProcessing = true
        const userId = this.userId
        const { data } = await tweetsAPI.likeTweet({tweetId})
        if (data.status === 'success') {
          this.userLikesId.push(likeId)
        }
        this.isProcessing = false
      } catch (error) {
        this.isProcessing = false
        console.warn(error)
      }
    },
    async unlikeTweet(tweetId, likeId) {
      try {
        this.isProcessing = true
        const userId = this.userId
        const { data } = await tweetsAPI.unlikeTweet({ tweetId })
        if (data.status === 'success') {
          this.userLikesId = this.userLikesId.map(userLikeId => {
            console.log('typeof userLikeId', typeof userLikeId, '; typeof likeId', typeof likeId,)
            if (userLikeId !== likeId) {
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
  },
  watch: {
    likes(newValue) {
      this.userLikesId = newValue.map(like => like.id)
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