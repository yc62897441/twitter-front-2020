<template>
  <div class="modal fade" v-bind:id="'modal'+tweet.id" tabindex="-1" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <img src="../assets/icon-close.png" alt="" type="button" data-bs-dismiss="modal" aria-label="Close">
        </div>
        <div class="modal-body">
          <div class="modal-tweet-wrapper">
            <div class="tweet-wrapper-left modal-tweet-wrapper-left">
              <img v-bind:src="tweet.User.avatar" alt="">
              <span></span>
            </div>
            <div class="tweet-wrapper-right">
              <div class="tweet-info">
                <div class="tweet-info-name"> {{tweet.User.name}}</div>
                <div class="tweet-info-account"> @{{tweet.User.account}} </div>
                <div class="tweet-info-data">・{{tweet.createdAt | fromNow}}</div>
              </div>
              <div class="tweet-description">
                {{ tweet.description}}
              </div>
              <div class="reply-to">
                回覆給<p>@{{tweet.User.account}}</p>
              </div>
            </div>
          </div>
          <div class="modal-new-tweet-wrapper">
            <div class="new-tweet-wrapper-left">
              <img src="../assets/avatar-photo.png" alt="">
            </div>
            <form class="new-tweet-wrapper-right">
              <input v-model="newTweetReply" type="text" class="form-control" aria-describedby="emailHelp"
                placeholder="推你的回覆" name="newTweetReply" required>
            </form>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-orange btn-new-tweet" data-bs-dismiss="modal"
            v-bind:disabled="isProcessing" @click.prevent.stop="handleSubmit(tweet.id)">回覆</button>
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
    tweet: {
      type: Object
    }
  },
  data() {
    return {
      newTweetReply: '',
      UserId: 1,
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
          UserId: this.UserId,
          comment: this.newTweetReply,
        }
        const { data } = await tweetsAPI.postTweetReply({formData, tweetId})
        this.$emit('after-post-tweet-reply', {
          ...data,
        })
        this.newTweetReply = ''
        this.isProcessing = false
      }catch (error) {
        this.isProcessing = false
        console.warn(error)
      }
    }
  },
  mixins: [fromNowFilter]
}
</script>

<style>
.modal-header img {
  width: 24px;
  height: 24px;
}

.modal-body {
  margin: 0px;
  padding: 0px;
}

.modal-tweet-wrapper {
  display: flex;
  padding: 15px;
}

.modal-tweet-wrapper-left span {
  display: block;
  width: 2px;
  height: calc(100% - 50px);
  margin: 5px auto 0px;
  background: #CCD6DD;
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

.modal-new-tweet-wrapper {
  display: flex;
  padding: 0px 15px;
}

.modal-footer {
  border: none;
}
</style>