<template>
  <div class="modal fade" v-bind:id="'modalNewTweet'" tabindex="-1" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <img src="../assets/icon-close.png" alt="" type="button" data-bs-dismiss="modal" aria-label="Close">
        </div>
        <div class="modal-body">
          <div class="modal-new-tweet-wrapper">
            <div class="modal-new-tweet-wrapper-left">
              <router-link class="link" v-bind:to="'/users/' + currentUser.id">
                <img v-bind:src="currentUser.avatar" alt="" type="button" data-bs-dismiss="modal" aria-label="Close">
              </router-link>
            </div>
            <form class="modal-new-tweet-wrapper-right">
              <textarea cols="30" rows="5" maxlength="140" placeholder="有什麼新鮮事？" v-model="newTweetDescription"
                name="newTweetDescription" v-on:keyup='words_deal' required></textarea>
              <div class="textContent-span-wrapper">
                <span class="textContent-span textContent-span-warning textContent-span-hidden">字數已達上限!</span>
                <span class="textContent-span textContent-span-hidden"></span>
                <button type="button" class="btn btn-orange btn-new-tweet" data-bs-dismiss="modal"
                  @click.prevent.stop="handleSubmit" v-bind:disabled="isProcessing">推文</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import tweetsAPI from '../api/tweets'
import { Toast } from '../utils/helpers'

export default {
  props: {
    currentUser: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isProcessing: false,
      newTweetDescription: '',
    }
  },
  methods: {
    async handleSubmit() {
      try {
        if (!this.newTweetDescription.trim()) {
          Toast.fire({
            icon: 'warning',
            title: '推文內容不可為空白'
          })
          return
        }
        this.isProcessing = true
        const formData = {
          userId: this.currentUser.id,
          description: this.newTweetDescription,
        }
        const { data } = await tweetsAPI.postTweet({ formData })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.$emit('after-post-new-tweet', {
          ...formData,
        })
        this.newTweetDescription = ''
        this.isProcessing = false
      } catch (error) {
        console.warn(error)
      }
    },
    words_deal(event) {
      const maxlength = event.target.attributes.maxlength.value
      const textlength = event.target.value.length

      // 可輸入的字數剩餘 20 字以內時
      if (maxlength - textlength <= 20) {
        // 顯示"目前字數/字數上限" 如 120/140
        event.target.parentElement.children[1].children[1].classList.remove('textContent-span-hidden')
        event.target.parentElement.children[1].children[1].textContent = `${textlength}/${maxlength}`

        // 目前字數>=字數上限時，顯示"字數已達上限"的提示
        if (textlength >= maxlength) {
          event.target.parentElement.children[1].children[0].classList.remove('textContent-span-hidden')
        } else {
          event.target.parentElement.children[1].children[0].classList.add('textContent-span-hidden')
        }
      } else {
        event.target.parentElement.children[1].children[0].classList.add('textContent-span-hidden')
        event.target.parentElement.children[1].children[1].classList.add('textContent-span-hidden')
      }
      return
    }
  }
}
</script>

<style>
.modal-new-tweet-wrapper {
  display: flex;
  padding: 15px;
}

.modal-new-tweet-wrapper-left img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.modal-new-tweet-wrapper-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
  margin: 0px;
  margin-left: 10px;
  padding: 0px;
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

.modal-new-tweet-wrapper-right textarea::placeholder {
  color: #9197A3;
}

.modal-new-tweet-wrapper-right textarea:focus,
.modal-new-tweet-wrapper-right textarea:focus-visible {
  width: 100%;
  margin: 0px;
  padding: 0px;
  border: none;
  outline: none;
}

.modal-new-tweet-wrapper-right .btn-new-tweet {
  width: 66px;
  height: 38px;
  border-radius: 100px;
}
</style>
