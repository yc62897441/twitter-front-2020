<template>
  <div class="admin-tweets-wrapper">
    <div v-for="tweet in tweets" :key="tweet.id" class="admin-tweet-wrapper">
      <div class="admin-tweet-wrapper-left">
        <img v-bind:src="tweet.User.avatar" alt="">
      </div>
      <div class="admin-tweet-wrapper-right">
        <div class="admin-tweet-wrapper-right-top">
          <div class="admin-tweet-user-info">
            <div class="admin-tweet-user-info-name"> {{ tweet.User.name }} </div>
            <div class="admin-tweet-user-info-account"> @{{ tweet.User.account }} </div>
            <div class="admin-tweet-user-info-data">・{{ tweet.createdAt | fromNow }}</div>
          </div>
          <div class="admin-tweet-delete-wrapper">
            <img type="button" src="../assets/icon-delete.png" alt="" v-on:click="deleteTweet(tweet.id)">
          </div>
        </div>
        <div class="admin-tweet-wrapper-right-bottom">
          <div class="admin-tweet-description">
            <template v-if="tweet.description.length <= 50">
              {{ tweet.description }}
            </template>
            <template v-else>
              {{ tweet.description.slice(0, 50) }} <p type="button" v-on:click="showMore(tweet.description, $event)">
                顯示更多...</p>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fromNowFilter } from '../utils/mixins'
import authorizationAPI from '../api/authorization'
export default {
  props: {
    propTweets: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      tweets: [],
    }
  },
  methods: {
    async deleteTweet(tweetId) {
      try {
        const response = await authorizationAPI.deleteTweet({ tweetId })
        let temTweets = []
        this.tweets.forEach(tweet => {
          if (tweet.id !== tweetId) {
            temTweets.push(tweet)
          }
        })
        this.tweets = temTweets
      } catch (error) {
        console.warn(error)
      }
    },
    showMore(tweetDescription, event) {
      event.target.parentElement.innerHTML = `${tweetDescription}`
    },
  },
  watch: {
    propTweets(newValue) {
      this.tweets = newValue
    },
  },
  mixins: [fromNowFilter],
}
</script>

<style>
.admin-tweets-wrapper {
  border-top: 1px solid #E6ECF0;
}

.admin-tweet-wrapper {
  display: flex;
  padding: 15px;
  border-bottom: 1px solid #E6ECF0;
}

.admin-tweet-wrapper-left img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
}

.admin-tweet-wrapper-right {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-left: 10px;
}

.admin-tweet-wrapper-right-top {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.admin-tweet-user-info {
  display: flex;
}

.admin-tweet-user-info :nth-child(1) {
  margin-right: 5px;
}

.admin-tweet-user-info-name {
  font-weight: 700;
  font-size: 15px;
  line-height: 22px;
  color: #1C1C1C;
}

.admin-tweet-user-info-account,
.admin-tweet-user-info-data {
  font-weight: 500;
  font-size: 15px;
  line-height: 22px;
  color: #657786;
}

.admin-tweet-delete-wrapper img {
  width: 15px;
  height: 15px;
}

.admin-tweet-description {
  margin-top: 6px;
  font-weight: 500;
  font-size: 15px;
  line-height: 22px;
  color: #1C1C1C;
  word-break: break-all;
}

.admin-tweet-description p {
  display: inline;
  font-weight: 900;
  margin: 0px;
}
</style>