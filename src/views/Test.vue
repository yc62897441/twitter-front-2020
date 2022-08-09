<template>
  <div class="container">
    <div class="left-container">
      <Navbar class="Navbar" v-bind:currentUser="currentUser" />
    </div>

    <div class="middle-container">
    </div>

    <div class="right-container">
      <FollowingsBar class="FollowingsBar" v-bind:currentUser="currentUser" />
    </div>

  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import FollowingsBar from '../components/FollowingsBar.vue'

export default {
  components: {
    Navbar,
    FollowingsBar,
  },
}
</script>

<style>
.container {
  display: flex;
  flex-direction: row;
  padding: 0px;
  align-items: flex-start;
}

.middle-container {
  width: 600px;
  margin-left: 240px;
  margin-right: 30px;
  border-left: 1px solid #E6ECF0;
  border-right: 1px solid #E6ECF0;
}
</style>