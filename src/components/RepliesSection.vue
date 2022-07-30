<template>
  <div>
    <div v-for="reply in replies" class="reply-wrapper">
      <div class="reply-wrapper-left">
        <img v-bind:src="reply.User.avatar" alt="">
      </div>
      <div class="reply-wrapper-right">
        <div class="reply-info">
          <div class="reply-info-name"> {{ reply.User.name }} </div>
          <div class="reply-info-account"> @{{ reply.User.account }} </div>
          <div class="reply-info-data">・ {{ reply.createdAt | fromNow }}</div>
        </div>
        <div class="reply-to">
            回覆給<p>@{{ tweetUser.account }}</p>
        </div>
        <div class="reply-description">
          {{ reply.comment }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fromNowFilter } from '../utils/mixins'

export default {
  props: {
    replies: {
      type: Array,
    },
    tweetUser: {
      type: Object,
    }
  },
  mixins: [fromNowFilter]
}

</script>

<style>
.reply-wrapper {
  display: flex;
  padding: 15px;
  border-bottom: 1px solid #E6ECF0;
}

.reply-wrapper-left img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.reply-wrapper-right {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
}

.reply-info {
  display: flex;
}

.reply-info :nth-child(1) {
  margin-right: 5px;
}

.reply-info-name {
  font-weight: 700;
  font-size: 15px;
  line-height: 22px;
  color: #1C1C1C;
}

.reply-info-account,
.reply-info-data {
  font-weight: 500;
  font-size: 15px;
  line-height: 22px;
  color: #657786;
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

.reply-description {
  margin-top: 6px;
  font-weight: 400;
  font-size: 15px;
  line-height: 22px;
  color: #1C1C1C;
}
</style>