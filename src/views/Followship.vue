<template>
  <div class="container">
    <div class="left-container">
      <Navbar class="Navbar" />
    </div>

    <div class="middle-container">
      <h1>User name</h1>
      <h3> 15 則推文</h3>
      <FollowshipNavPills v-on:after-change-followship-nav-pills="afterChangeFollowshipNavPills" />
      <FollowshipSection v-bind:userFollowings="userFollowings" v-bind:userFollowers="userFollowers"
        v-bind:show="show" />
    </div>

    <div class="right-container">
      <FollowingsBar class="FollowingsBar" />
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import FollowingsBar from '../components/FollowingsBar.vue'
import FollowshipNavPills from '../components/FollowshipNavPills.vue'
import FollowshipSection from '../components/FollowshipSection.vue'

import usersAPI from '../api/users'
import tweetsAPI from '../api/tweets'

export default {
  components: {
    Navbar,
    FollowingsBar,
    FollowshipNavPills,
    FollowshipSection,
  },
  data() {
    return {
      currentUserId: 1,
      user: {},
      userFollowings: [],
      userFollowers: [],
      show: 'userFollowers'
    }
  },
  methods: {
    async fetchUser() {
      try {
        const userId = this.currentUserId
        const response = await usersAPI.getUser({ userId })
        const data = response.data
        this.user = {
          ...data,
        }
      } catch (error) {
        console.warn(error)
      }
    },
    async fetchUserFollowings() {
      try {
        const userId = this.currentUserId
        const response = await usersAPI.getUserFollowings({ userId })
        const data = response.data
        this.userFollowings = data
      } catch (error) {
        console.warn(error)
      }
    },
    async fetchUserFollowers() {
      try {
        const userId = this.currentUserId
        const response = await usersAPI.getUserFollowers({ userId })
        const data = response.data
        this.userFollowers = data
      } catch (error) {
        console.warn(error)
      }
    },
    afterChangeFollowshipNavPills(payload) {
      if (payload.value === 'followship-nav-pills-followings') {
        this.show = 'userFollowings'
      } else if (payload.value === 'followship-nav-pills-followers') {
        this.show = 'userFollowers'
      }
    },
  },
  created() {
    this.fetchUser()
    this.fetchUserFollowings()
    this.fetchUserFollowers()
  }
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