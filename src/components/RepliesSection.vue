<template>
  <div>
    <div class="reply-wrapper">
      <div class="reply-wrapper-left">
        <img src="https://www.w3schools.com/howto/img_avatar.png" alt="">
      </div>
      <div class="reply-wrapper-right">
        <div class="reply-info">
          <div class="reply-info-name"> reply.User.name </div>
          <div class="reply-info-account"> @reply.User.account </div>
          <div class="reply-info-data">・ reply.createdAt | fromNow </div>
        </div>
        <div class="reply-to">
          回覆給<p>@reply.User.account</p>
        </div>
        <div class="reply-description">
          reply.description
        </div>
      </div>
    </div>

    <div class="reply-wrapper">
      <div class="reply-wrapper-left">
        <img src="https://www.w3schools.com/howto/img_avatar2.png" alt="">
      </div>
      <div class="reply-wrapper-right">
        <div class="reply-info">
          <div class="reply-info-name"> reply.User.name </div>
          <div class="reply-info-account"> @reply.User.account </div>
          <div class="reply-info-data">・ reply.createdAt | fromNow </div>
        </div>
        <div class="reply-to">
          回覆給<p>@reply.User.account</p>
        </div>
        <div class="reply-description">
          reply.description
        </div>
      </div>
    </div>
  </div>
</template>

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