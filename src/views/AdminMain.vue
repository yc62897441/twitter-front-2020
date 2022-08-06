<template>
  <div class="container">
    <div class="left-container">
      <NavBarAdmin class="NavBarAdmin" v-bind:currentUser="currentUser"
        v-bind:currentViewPageName="currentViewPageName" />
    </div>
    <div class="middle-container">
      <h1>推文清單</h1>
    </div>
  </div>
</template>

<script>
import NavBarAdmin from '../components/NavBarAdmin.vue'
import {mapState} from 'vuex'

export default {
  components: {
    NavBarAdmin,
  },
  data() {
    return {
      currentViewPageName: '',
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  mounted() {
    console.log('this.$route', this.$route)
    this.currentViewPageName = this.$route.name
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