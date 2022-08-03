<template>
  <div class="user-nav-pills-wrapper">
    <fieldset>
      <div>
        <input type="radio" id="user-nav-pills-tweets" name="user-nav-pills" value="user-nav-pills-tweets"
          v-on:change="changeUserNavPills" checked>
        <label class="user-nav-pills-link" for="user-nav-pills-tweets">推文</label>
      </div>
      <div>
        <input type="radio" id="user-nav-pills-tweetsAndReplies" name="user-nav-pills"
          value="user-nav-pills-tweetsAndReplies" v-on:change="changeUserNavPills">
        <label class="user-nav-pills-link" for="user-nav-pills-tweetsAndReplies">推文與回覆</label>
      </div>
      <div>
        <input type="radio" id="user-nav-pills-likes" name="user-nav-pills" value="user-nav-pills-likes"
          v-on:change="changeUserNavPills">
        <label class="user-nav-pills-link" for="user-nav-pills-likes">喜歡的內容</label>
      </div>
    </fieldset>
  </div>
</template>

<script>
export default {
  methods: {
    changeUserNavPills(event) {
      this.$emit('after-change-user-nav-pills', {
        value: event.target.value
      })
    }
  }
}
</script>

<style>
.user-nav-pills-wrapper fieldset {
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #E6ECF0;
}

.user-nav-pills-wrapper fieldset input {
  display: none;
}

.user-nav-pills-link {
  display: block;
  text-align: center;
  width: 130px;
  font-weight: 700;
  font-size: 15px;
  line-height: 22px;
  color: #657786;
  text-decoration: none;
}

.user-nav-pills-wrapper fieldset input:checked+label {
  color: #FF6600;
  border-bottom: 2px solid #FF6600;
}
</style>
