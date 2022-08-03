<template>
  <div>
    <div v-for="tweet in tweets" :key="tweet.id" class="tweet-wrapper">
      <div class="tweet-wrapper-left">
        <img v-bind:src="tweet.User.avatar" alt="">
      </div>
      <div class="tweet-wrapper-right">
        <div class="tweet-info">
          <div class="tweet-info-name">{{ tweet.User.name }}</div>
          <div class="tweet-info-account"> @{{ tweet.User.account }}</div>
          <div class="tweet-info-data">・{{ tweet.createdAt | fromNow }}</div>
        </div>
        <div class="tweet-description">
          {{ tweet.description }}
        </div>
        <div class="tweet-interaction">
          <div>
            <!-- trigger modal -->
            <img src="../assets/icon-reply.png" alt="" type="button" data-bs-toggle="modal"
              v-bind:data-bs-target="'#modal' + tweet.id">
            <p>{{ tweet.Replies.length }}</p>
          </div>
          <div>
            <img src="../assets/icon-like.png" alt="">
            <p>{{ tweet.Likes.length }}</p>
          </div>
        </div>
      </div>

      <ModalTweetReply v-bind:tweet="tweet" v-on:after-post-tweet-reply="afterPostTweetReply" />
    </div>
  </div>
</template>

<script>
import { fromNowFilter } from '../utils/mixins'
import ModalTweetReply from './ModalTweetReply.vue'
export default {
  components: {
    ModalTweetReply
  },
  props: {
    tweets: {
      type: Array,
      required: true
    }
  },
  methods: {
    afterPostTweetReply(payload) {
      const { TweetId } = payload
      this.tweets.forEach(tweet => {
        if (tweet.id === Number(TweetId)) {
          tweet.Replies.push({
            TweetId: payload.TweetId,
            UserId: payload.UserId,
            comment: payload.comment,
            createdAt: payload.createdAt,
            id: payload.id,
            updatedAt: payload.updatedAt,
          })
        }
      })
    },
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
  border-radius: 50%;
}

.tweet-wrapper-right {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
}

.tweet-info,
.tweet-interaction {
  display: flex;
}

.tweet-info :nth-child(1) {
  margin-right: 5px;
}

.tweet-info-name {
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
  word-break: break-all
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
  margin-left: 12px;
}
</style>