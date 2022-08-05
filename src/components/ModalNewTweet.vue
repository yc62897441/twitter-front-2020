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
              <img src="../assets/avatar-photo.png" alt="">
            </div>
            <form class="modal-new-tweet-wrapper-right">
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
      currentUserId: 1
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
          userId: this.currentUserId,
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


.modal-new-tweet-wrapper {
  display: flex;
  padding: 15px;
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
