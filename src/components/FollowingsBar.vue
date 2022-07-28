<template>
  <div class="followingsBar-wrapper">
    <div class="followingsBar-title">Popular</div>
    
    <div class="recommended-following-wrapper">
      <div class="following-info-wrapper">
        <div class="avatar-wrapper">
          <img src="../assets/avatar-photo.png" alt="">
        </div>
        <div class="info-wrapper">
          <div class="info-wrapper-name">name</div>
          <div class="info-wrapper-account">account</div>
        </div>
      </div>
      <div class="follow-btn-wrapper">
        <button type="submit" class="btn btn-orange" v-bind:disabled="isProcessing">跟隨</button>
      </div>
    </div>

    <div class="recommended-following-wrapper">
      <div class="following-info-wrapper">
        <div class="avatar-wrapper">
          <img src="../assets/avatar-photo.png" alt="">
        </div>
        <div class="info-wrapper">
          <div class="info-wrapper-name">name</div>
          <div class="info-wrapper-account">account</div>
        </div>
      </div>
      <div class="follow-btn-wrapper">
        <button type="submit" class="btn btn-orange" v-bind:disabled="isProcessing">跟隨</button>
      </div>
    </div>

  </div>
</template>

<style>
.followingsBar-wrapper {
  position: fixed;
  display: flex;
  flex-direction: column;
  width: 350px;
  height: auto;
  margin-top: 15px;
  padding: 17px 0px 5px;
  background: #F5F8FA;
  border-radius: 14px;
}

.followingsBar-title {
  margin: 10px 0px;
  margin-left: 15px;
  /* font-family: 'Noto Sans TC';
    font-style: normal; */
  font-weight: 700;
  font-size: 18px;
  line-height: 26px;
  color: #1C1C1C;
}

.recommended-following-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  margin-left: 15px;
  padding: 10px 0px;
  border-top: 1px solid #E6ECF0;
}

.following-info-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.avatar-wrapper img {
  width: 50px;
  height: 50px;
}

.info-wrapper {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
}

.info-wrapper-name {
  /* font-family: 'Noto Sans TC';
  font-style: normal; */
  font-weight: 700;
  font-size: 15px;
  line-height: 15px;
  color: #1C1C1C;
}

.info-wrapper-account {
  /* font-family: 'Noto Sans TC';
    font-style: normal; */
  font-weight: 700;
  font-size: 15px;
  line-height: 15px;
  color: #657786;
}

.follow-btn-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0px;
  padding: 0px;
  height: 100%;
}

.follow-btn-wrapper .btn {
  position: absolute;
  top: 0px;
  right: 15px;
  height: 35px;
  width: 60px;
  margin: 0px;
  padding: 0px;
  background-color: #ffffff;
  border: 1px solid #FF6600;
  border-radius: 100px;
  color: #FF6600;
}
</style>