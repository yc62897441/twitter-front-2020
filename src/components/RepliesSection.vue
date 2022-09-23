<template>
  <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy">
    <div v-for="reply in replies" v-bind:key="'reply' + reply.id" class="reply-wrapper">
      <div class="reply-wrapper-left">
        <router-link class="link" v-bind:to="'/users/' + reply.User.id">
          <img v-bind:src="reply.User.avatar" alt="">
        </router-link>
      </div>
      <div class="reply-wrapper-right">
        <div class="reply-info">
          <router-link class="link" v-bind:to="'/users/' + reply.User.id">
            <div class="reply-info-name"> {{ reply.User.name }} </div>
          </router-link>
          <router-link class="link" v-bind:to="'/users/' + reply.User.id">
            <div class="reply-info-account">@{{ reply.User.account }} </div>
          </router-link>
          <div class="reply-info-data">・{{ reply.createdAt | fromNow }}</div>
        </div>
        <div class="reply-to">
          回覆給
          <router-link class="link" v-bind:to="'/users/' + reply.Tweet.User.id">
            <p>@{{ reply.Tweet.User.account }}</p>
          </router-link>
        </div>
        <router-link class="link" v-bind:to="'/tweets/' + reply.Tweet.id">
          <div class="reply-description">
            {{ reply.comment }}
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { fromNowFilter } from '../utils/mixins'

export default {
  props: {
    replies: {
      type: Array,
    },
    loadMoreTrigger: {
      type: String
    }
  },
  methods: {
    loadMore() {
      if (this.loadMoreTrigger !== 'replies') {
        console.log('replies')
        return
      }
      this.busy = true
      // 設定至少 1.5 秒後才可以再 trigger 一次
      this.$emit('load-more', {
        'from': 'repliesSection'
      })
      setTimeout(() => {
        this.busy = false
      }, 1500)
    }
  },
  mixins: [fromNowFilter]
}
</script>

<style>
.reply-wrapper {
  display: flex;
  padding: 15px;
  border-bottom: 1px solid #E6ECF0;
}

.reply-wrapper-left img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
}

.reply-wrapper-right {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
}

.reply-info {
  display: flex;
}

.reply-info-name {
  margin-right: 5px;
  font-weight: 700;
  font-size: 15px;
  line-height: 22px;
  color: #1C1C1C;
}

.reply-info-account,
.reply-info-data {
  font-weight: 500;
  font-size: 15px;
  line-height: 22px;
  color: #657786;
}

.reply-to {
  display: flex;
  margin-top: 4px;
  font-weight: 500;
  font-size: 15px;
  line-height: 22px;
  color: #657786;
}

.reply-to p {
  margin: 0px;
  margin-left: 2px;
  color: #FF6600;
}

.reply-description {
  margin-top: 6px;
  font-weight: 400;
  font-size: 15px;
  line-height: 22px;
  color: #1C1C1C;
  word-break: break-all
}
</style>