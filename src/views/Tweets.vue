<template>
  <div class="container">
    <div class="left-container">
      <Navbar class="Navbar" />
    </div>
    <div class="middle-container">
      <h1>Tweets</h1>
      <h1>Tweets</h1>
      <h1>Tweets</h1>
      <h1>Tweets</h1>
      <h1>Tweets</h1>
      <h1>Tweets</h1>
      <h1>Tweets</h1>
      <h1>Tweets</h1>
      <h1>Tweets</h1>
      <h1>Tweets</h1>
      <h1>Tweets</h1>
      <h1>Tweets</h1>
      <h1>Tweets</h1>
      <h1>Tweets</h1>
      <h1>Tweets</h1>
      <h1>Tweets</h1>
      <h1>Tweets</h1>
      <h1>Tweets</h1>
      <h1>Tweets</h1>
      <h1>Tweets</h1>
    </div>

    <div class="right-container">右邊 追蹤推薦</div>

  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'

export default {
  components: {
    Navbar,
  }
}

</script>

<style>

.container {
  display: flex;
  flex-direction: row;
  border: 2px solid red;
  padding: 0px;
  align-items: flex-start;
}

.middle-container {
  margin-left: 240px;
  width: 600px;
}

/* .left-container {
  position: relative;
}

.Navbar {
  position: fixed;
  width: 100%
} */
</style>