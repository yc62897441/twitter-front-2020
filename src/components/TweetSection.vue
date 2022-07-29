<template>
  <div id="tweet-wrapper">
    <div class="tweet-user-info-layer">
      <div>
        <img src="../assets/avatar-photo.png" alt="">
      </div>
      <div class="user-info-wrapper">
        <div class="user-info-name">name</div>
        <div class="user-info-account">@account</div>
      </div>
    </div>

    <div class="tweet-description-layer">
      Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation
      incididunt aliquip deserunt reprehenderit elit laborum.
    </div>

    <div class="tweet-date-layer">
      上午 10:05・2020年6月10日
    </div>

    <div class="tweet-interaction-layer">
      <div>456<p>回覆</p>
      </div>
      <div>456<p>喜歡次數</p>
      </div>
    </div>

    <div class="tweet-interaction-icons-layer">
      <img src="../assets/icon-reply.png" alt="">
      <img src="../assets/icon-like.png" alt="">
    </div>
  </div>
</template>

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
</style>