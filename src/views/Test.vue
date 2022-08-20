<template>
  <div class="container">
    <div class="left-container">
      <!-- <Navbar class="Navbar" v-bind:currentUser="currentUser" /> -->
    </div>

    <div class="middle-container">

      <body>

        <button v-on:click="aaa">press</button>
        <h1>test git merge</h1>
        <h1>test git merge(not merge)</h1>
      </body>

    </div>

    <div class="right-container">
      <!-- <FollowingsBar class="FollowingsBar" v-bind:currentUser="currentUser" /> -->
    </div>

  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import FollowingsBar from '../components/FollowingsBar.vue'
import testAPI from '../api/test'

export default {
  components: {
    Navbar,
    FollowingsBar,
  },
  data() {
    return {
    }
  },
  methods: {
    async aaa() {
      try {
        const response = await testAPI.getNotFound()
        if (response.data.status !== 'success') {
          throw new Error(data.message)
        }
      } catch (error) {
        this.$router.push({ name: 'not-found' })
      }
    }
  }
}
</script>

<style>
</style>