<template>
  <div class="modal fade" v-bind:id="'modal' + tweet.id" tabindex="-1" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <img src="../assets/icon-close.png" alt="" type="button" data-bs-dismiss="modal" aria-label="Close">
        </div>
        <div class="modal-body">
          <div class="modal-tweet-wrapper">
            <div class="modal-tweet-wrapper-left">
              <img v-bind:src="tweet.User.avatar" alt="">
              <span></span>
            </div>
            <div class="modal-tweet-wrapper-right">
              <div class="modal-tweet-info">
                <div class="modal-tweet-info-name"> {{ tweet.User.name }}</div>
                <div class="modal-tweet-info-account"> @{{ tweet.User.account }} </div>
                <div class="modal-tweet-info-data">・{{ tweet.createdAt | fromNow }}</div>
              </div>
              <div class="modal-tweet-description">
                {{ tweet.description }}
              </div>
              <div class="modal-reply-to">
                回覆給<p>@{{ tweet.User.account }}</p>
              </div>
            </div>
          </div>
          <div class="modal-new-tweet-wrapper">
            <div class="modal-new-tweet-wrapper-left">
              <img src="../assets/avatar-photo.png" alt="">
            </div>
            <form class="modal-new-tweet-wrapper-right">
              <textarea cols="30" rows="5" placeholder="推你的回覆" v-model="newTweetReply" name="newTweetReply"
                required></textarea>
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

.modal-tweet-wrapper-left img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.modal-tweet-wrapper-left span {
  display: block;
  width: 2px;
  height: calc(100% - 30px);
  margin: 5px auto 0px;
  background: #CCD6DD;
}

.modal-tweet-wrapper-right {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
}

.modal-tweet-info {
  display: flex;
}

.modal-tweet-info :nth-child(1) {
  margin-right: 5px;
}

.modal-tweet-info-name {
  font-weight: 700;
  font-size: 15px;
  line-height: 22px;
  color: #1C1C1C;
}

.modal-tweet-info-account,
.modal-tweet-info-data {
  font-weight: 500;
  font-size: 15px;
  line-height: 22px;
  color: #657786;
}

.modal-tweet-description {
  margin-top: 6px;
  font-weight: 500;
  font-size: 15px;
  line-height: 22px;
  color: #1C1C1C;
  word-break: break-all
}

.modal-reply-to {
  display: flex;
  margin-top: 4px;
  font-weight: 500;
  font-size: 15px;
  line-height: 22px;
  color: #657786;
}

.modal-reply-to p {
  margin: 0px;
  margin-left: 2px;
  color: #FF6600;
}

.modal-new-tweet-wrapper {
  display: flex;
  padding: 0px 15px;
}

.modal-new-tweet-wrapper-left img {
  width: 50px;
  height: 50px;
}

.modal-new-tweet-wrapper-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin: 0px;
  margin-left: 10px;
  padding: 0px;
}

.modal-new-tweet-wrapper-right input::placeholder {
  color: #9197A3;
}

.modal-new-tweet-wrapper-right textarea {
  width: 100%;
  margin: 0px;
  padding: 0px;
  border: none;
  font-weight: 500;
  font-size: 18px;
  line-height: 26px;
  resize: none;
}

.modal-new-tweet-wrapper-right textarea:focus,
.modal-new-tweet-wrapper-right textarea:focus-visible {
  width: 100%;
  margin: 0px;
  padding: 0px;
  border: none;
  outline: none;
}

.modal-footer {
  border: none;
}

.modal-footer .btn-new-tweet {
  width: 66px;
  height: 38px;
  border-radius: 100px;
}
</style>