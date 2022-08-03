<template>
  <div class="followship-nav-pills-wrapper">
    <fieldset>
      <div>
        <input type="radio" id="followship-nav-pills-followers" name="followship-nav-pills"
          value="followship-nav-pills-followers" checked>
        <label class="followship-nav-pills-link" for="followship-nav-pills-followers">跟隨者</label>
      </div>
      <div>
        <input type="radio" id="followship-nav-pills-followings" name="followship-nav-pills"
          value="followship-nav-pills-followings">
        <label class="followship-nav-pills-link" for="followship-nav-pills-followings">正在跟隨</label>
      </div>
    </fieldset>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.followship-nav-pills-wrapper fieldset {
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #E6ECF0;
}

.followship-nav-pills-wrapper fieldset input {
  display: none;
}

.followship-nav-pills-link {
  display: block;
  text-align: center;
  width: 130px;
  font-weight: 700;
  font-size: 15px;
  line-height: 22px;
  color: #657786;
  text-decoration: none;
}

.followship-nav-pills-wrapper fieldset input:checked+label {
  color: #FF6600;
  border-bottom: 2px solid #FF6600;
}
</style>
