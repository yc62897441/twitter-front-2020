<template>
  <div class="new-tweet-wrapper">
    <div class="new-tweet-wrapper-left">
      <router-link class="link" v-bind:to="'/users/' + currentUser.id">
        <img v-bind:src="currentUser.avatar" alt="">
      </router-link>
    </div>
    <form @submit.prevent.stop="handleSubmit" class="new-tweet-wrapper-right">
      <textarea cols="30" rows="5" maxlength="140" placeholder="有什麼新鮮事？" v-model="newTweetDescription"
        name="newTweetDescription" v-on:keyup='words_deal' required></textarea>
      <div class="textContent-span-wrapper">
        <span class="textContent-span textContent-span-warning textContent-span-hidden">字數已達上限!</span>
        <span class="textContent-span textContent-span-hidden"></span>
        <button type="submit" class="btn btn-orange btn-new-tweet" v-bind:disabled="isProcessing">推文</button>
      </div>
    </form>
  </div>
</template>

<script>
import { Toast } from '../utils/helpers'

export default {
  props: {
    isProcessing: {
      type: Boolean,
      required: true
    },
    currentUser: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      newTweetDescription: '',
    }
  },
  methods: {
    handleSubmit(event) {
      if (!this.newTweetDescription.trim()) {
        Toast.fire({
          icon: 'warning',
          title: '推文內容不可為空白'
        })
        return
      }
      // 避免使用者移除 textarea 的 maxlength="140" 屬性
      if (this.newTweetDescription.length > 140) {
        this.newTweetDescription = this.newTweetDescription.slice(0, 140)
      }
      this.$emit('after-create-tweet', {
        UserId: this.currentUser.id,
        description: this.newTweetDescription,
      })
      this.newTweetDescription = ''
      // 送出後，清除字數上限提示
      event.target.children[1].children[0].classList.add('textContent-span-hidden')
      event.target.children[1].children[1].classList.add('textContent-span-hidden')
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
.new-tweet-wrapper {
  display: flex;
  padding: 15px;
  border-top: 1px solid #E6ECF0;
  border-bottom: 10px solid #E6ECF0;
}

.new-tweet-wrapper-left img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.new-tweet-wrapper-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
  margin: 0px;
  margin-left: 10px;
  padding: 0px;
}

.new-tweet-wrapper-right textarea {
  width: 100%;
  margin: 0px;
  padding: 0px;
  border: none;
  font-weight: 500;
  font-size: 18px;
  line-height: 26px;
  resize: none;
}

.new-tweet-wrapper-right textarea::placeholder {
  color: #9197A3;
}

.new-tweet-wrapper-right textarea:focus,
.new-tweet-wrapper-right textarea:focus-visible {
  width: 100%;
  margin: 0px;
  padding: 0px;
  border: none;
  outline: none;
}

.new-tweet-wrapper-right .btn-new-tweet {
  width: 66px;
  height: 38px;
  border-radius: 100px;
}
</style>