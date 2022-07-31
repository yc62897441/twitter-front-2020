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
      <div>{{ tweet.Replies.length }}<p>回覆</p>
      </div>
      <div>{{ tweet.Likes.length }}<p>喜歡次數</p>
      </div>
    </div>

    <div class="tweet-interaction-icons-layer">
      <!-- trigger modal -->
      <img src="../assets/icon-reply.png" alt="" type="button" data-bs-toggle="modal"
        v-bind:data-bs-target="'#modal' + tweet.id">
      <img src="../assets/icon-like.png" alt="">
    </div>

    <div class="modal fade" v-bind:id="'modal' + tweet.id" tabindex="-1" aria-labelledby="exampleModalLabel"
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
                  <div class="tweet-info-name"> {{ tweet.User.name }}</div>
                  <div class="tweet-info-account"> @{{ tweet.User.account }} </div>
                  <div class="tweet-info-data">・{{ tweet.createdAt | fromNow }}</div>
                </div>
                <div class="tweet-description">
                  {{ tweet.description }}
                </div>
                <div class="reply-to">
                  回覆給<p>@{{ tweet.User.account }}</p>
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

  </div>
</template>

<script>
import tweetsAPI from '../api/tweets'
import { fromNowFilter } from '../utils/mixins'

export default {
  props: {
    tweet: {
      type: Object,
      required: true
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

.new-tweet-wrapper {
  display: flex;
  padding: 15px;
  border-top: 1px solid #E6ECF0;
  border-bottom: 10px solid #E6ECF0;
}

.new-tweet-wrapper-left img {
  width: 50px;
  height: 50px;
}

.new-tweet-wrapper-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin: 0px;
  margin-left: 10px;
  padding: 0px;
}

.new-tweet-wrapper-right input {
  margin: 0px;
  padding: 0px;
  border: none;
  font-weight: 500;
  font-size: 18px;
  line-height: 26px;
}

.new-tweet-wrapper-right input::placeholder {
  color: #9197A3;
}

.new-tweet-wrapper-right input:focus {
  box-shadow: none;
}

.btn-new-tweet {
  width: 66px;
  height: 38px;
  border-radius: 100px;
}

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
  /* font-family: 'Noto Sans TC';
    font-style: normal; */
  font-weight: 700;
  font-size: 15px;
  line-height: 22px;
  color: #1C1C1C;
}

.tweet-info-account,
.tweet-info-data {
  /* font-family: 'Noto Sans TC';
    font-style: normal; */
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