<template>
  <div class="new-tweet-wrapper">
    <div class="new-tweet-wrapper-left">
      <img src="../assets/avatar-photo.png" alt="">
    </div>
    <form @submit.prevent.stop="handleSubmit" class="new-tweet-wrapper-right">
      <textarea cols="30" rows="5" placeholder="有什麼新鮮事？" v-model="newTweetDescription" name="newTweetDescription"
        required></textarea>
      <button type="submit" class="btn btn-orange btn-new-tweet" v-bind:disabled="isProcessing">推文</button>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    isProcessing: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      newTweetDescription: '',
      userId: 1
    }
  },
  methods: {
    handleSubmit() {
      this.$emit('after-create-tweet', {
        UserId: this.userId,
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
</style>