<template>
  <div class="new-tweet-wrapper">
    <div class="new-tweet-wrapper-left">
      <router-link class="link" v-bind:to="'/users/' + currentUser.id">
        <img v-bind:src="currentUser.avatar" alt="">
      </router-link>
    </div>
    <form @submit.prevent.stop="handleSubmit" class="new-tweet-wrapper-right">
      <textarea cols="30" rows="5" maxlength="140" placeholder="有什麼新鮮事？" v-model="newTweetDescription"
        name="newTweetDescription" required></textarea>
      <button type="submit" class="btn btn-orange btn-new-tweet" v-bind:disabled="isProcessing">推文</button>
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
    handleSubmit() {
      if (!this.newTweetDescription.trim()) {
        Toast.fire({
          icon: 'warning',
          title: '推文內容不可為空白'
        })
        return
      }
      this.$emit('after-create-tweet', {
        UserId: this.currentUser.id,
        description: this.newTweetDescription,
      })
      this.newTweetDescription = ''
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