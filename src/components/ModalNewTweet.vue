<template>
  <div class="modal fade" v-bind:id="'modalNewTweet'" tabindex="-1" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <img src="../assets/icon-close.png" alt="" type="button" data-bs-dismiss="modal" aria-label="Close">
        </div>
        <div class="modal-body">
          <div class="new-tweet-wrapper">
            <div class="new-tweet-wrapper-left">
              <img src="../assets/avatar-photo.png" alt="">
            </div>
            <form class="new-tweet-wrapper-right">
              <textarea cols="30" rows="5" placeholder="有什麼新鮮事？" v-model="newTweetDescription"
                name="newTweetDescription" required></textarea>
              <button type="button" class="btn btn-orange btn-new-tweet" @click.prevent.stop="handleSubmit"
                v-bind:disabled="isProcessing">推文</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import tweetsAPI from '../api/tweets'

export default {
  data() {
    return {
      isProcessing: false,
      newTweetDescription: '',
      UserId: 1
    }
  },
  methods: {
    async handleSubmit() {
      try {
        if (!this.newTweetDescription.trim()) {
          return
        }
        this.isProcessing = true
        const formData = {
          UserId: this.UserId,
          description: this.newTweetDescription,
        }
        const { data } = await tweetsAPI.postTweet({ formData })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.newTweetDescription = ''
        this.isProcessing = false
      } catch (error) {
        console.warn(error)
      }
    }
  }
}
</script>

<style>
textarea {
  width: 100%;
  margin: 0px;
  padding: 0px;
  border: none;
  font-weight: 500;
  font-size: 18px;
  line-height: 26px;
  resize: none;
}

textarea:focus,
textarea:focus-visible {
  width: 100%;
  margin: 0px;
  padding: 0px;
  border: none;
  outline: none;
}
</style>
