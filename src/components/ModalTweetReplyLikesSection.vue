<template>
  <div class="modal fade" v-bind:id="'modalTweetReplyLikesSection' + tweet.id" tabindex="-1"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <img src="../assets/icon-close.png" alt="" type="button" data-bs-dismiss="modal" aria-label="Close">
        </div>
        <div class="modal-body">
          <div class="modal-tweet-wrapper">
            <div class="modal-tweet-wrapper-left">
              <router-link class="link" v-bind:to="'/users/' + tweet.User.id">
                <img v-bind:src="tweet.User.avatar" alt="" type="button" data-bs-dismiss="modal" aria-label="Close">
              </router-link>
              <span></span>
            </div>
            <div class="modal-tweet-wrapper-right">
              <div class="modal-tweet-info">
                <router-link class="link" v-bind:to="'/users/' + tweet.User.id">
                  <div class="modal-tweet-info-name" type="button" data-bs-dismiss="modal" aria-label="Close">
                    {{ tweet.User.name }}</div>
                </router-link>
                <router-link class="link" v-bind:to="'/users/' + tweet.User.id">
                  <div class="modal-tweet-info-account" type="button" data-bs-dismiss="modal" aria-label="Close">
                    @{{ tweet.User.account }} </div>
                </router-link>
                <div class="modal-tweet-info-data">・{{ tweet.createdAt | fromNow }}</div>
              </div>
              <div class="modal-tweet-description">
                {{ tweet.description }}
              </div>
              <div class="modal-reply-to">
                回覆給
                <router-link class="link" v-bind:to="'/users/' + tweet.User.id">
                  <p type="button" data-bs-dismiss="modal" aria-label="Close">@{{ tweet.User.account }}</p>
                </router-link>
              </div>
            </div>
          </div>
          <div class="modal-tweet-reply-wrapper">
            <div class="modal-tweet-reply-wrapper-left">
              <router-link class="link" v-bind:to="'/users/' + currentUser.id">
                <img v-bind:src="currentUser.avatar" alt="" type="button" data-bs-dismiss="modal" aria-label="Close">
              </router-link>
            </div>
            <form class="modal-tweet-reply-wrapper-right">
              <textarea v-bind:tweetId="tweet.id" cols="30" rows="5" maxlength="140" placeholder="推你的回覆"
                v-model="newTweetReply" name="newTweetReply" v-on:keyup='words_deal' required></textarea>
            </form>
          </div>
        </div>
        <div class="modal-footer">
          <div v-bind:id="'modalTweetReplyLikesSection-textContent-span-wrapper' + tweet.id"
            class="textContent-span-wrapper">
            <span class="textContent-span textContent-span-warning textContent-span-hidden">字數已達上限!</span>
            <span class="textContent-span textContent-span-hidden"></span>
            <button type="button" class="btn btn-orange btn-new-tweet" data-bs-dismiss="modal"
              v-bind:disabled="isProcessing" @click.prevent.stop="handleSubmit(tweet.id, $event)">回覆</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import tweetsAPI from '../api/tweets'
import { fromNowFilter } from '../utils/mixins'
import { Toast } from '../utils/helpers'

export default {
  props: {
    tweet: {
      type: Object
    },
    currentUser: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      newTweetReply: '',
      isProcessing: false
    }
  },
  methods: {
    async handleSubmit(tweetId, event) {
      try {
        if (this.newTweetReply.trim() === '') {
          Toast.fire({
            icon: 'warning',
            title: '回覆內容不可為空白'
          })
          return
        }
        // 避免使用者移除 textarea 的 maxlength="140" 屬性
        if (this.newTweetReply.length > 140) {
          this.newTweetReply = this.newTweetReply.slice(0, 140)
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
        // 送出後，清除字數上限提示
        event.target.parentElement.children[0].classList.add('textContent-span-hidden')
        event.target.parentElement.children[1].classList.add('textContent-span-hidden')
        this.isProcessing = false
      } catch (error) {
        this.isProcessing = false
        console.warn(error)
      }
    },
    words_deal(event) {
      const maxlength = event.target.attributes.maxlength.value
      const textlength = event.target.value.length    
      const textContentSpanWrapper = document.querySelector(`#modalTweetReplyLikesSection-textContent-span-wrapper${Number(event.target.attributes.tweetid.value)}`)

      // 可輸入的字數剩餘 20 字以內時
      if (maxlength - textlength <= 20) {
        // 顯示"目前字數/字數上限" 如 120/140
        textContentSpanWrapper.children[1].classList.remove('textContent-span-hidden')
        textContentSpanWrapper.children[1].textContent = `${textlength}/${maxlength}`

        // 目前字數>=字數上限時，顯示"字數已達上限"的提示
        if (textlength >= maxlength) {
          textContentSpanWrapper.children[0].classList.remove('textContent-span-hidden')
        } else {
          textContentSpanWrapper.children[0].classList.add('textContent-span-hidden')
        }
      } else {
        textContentSpanWrapper.children[0].classList.add('textContent-span-hidden')
        textContentSpanWrapper.children[1].classList.add('textContent-span-hidden')
      }
      return
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
  object-fit: cover;
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
  margin-top: 20px;
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

.modal-tweet-reply-wrapper {
  display: flex;
  padding: 15px;
}

.modal-tweet-reply-wrapper-left img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
}

.modal-tweet-reply-wrapper-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
  margin: 0px;
  margin-left: 10px;
  padding: 0px;
}

.modal-tweet-reply-wrapper-right input::placeholder {
  color: #9197A3;
}

.modal-tweet-reply-wrapper-right textarea {
  width: 100%;
  margin: 0px;
  padding: 0px;
  border: none;
  font-weight: 500;
  font-size: 18px;
  line-height: 26px;
  resize: none;
}

.modal-tweet-reply-wrapper-right textarea:focus,
.modal-tweet-reply-wrapper-right textarea:focus-visible {
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