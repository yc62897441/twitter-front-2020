<template>
  <div class="container">
    <div class="left-container">
      <NavBarAdmin class="NavBarAdmin" />
    </div>
    <div class="middle-container">
      <h1>推文清單</h1>
    </div>
  </div>
</template>

<script>
import NavBarAdmin from '../components/NavBarAdmin.vue'

export default {
  components: {
    NavBarAdmin,
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