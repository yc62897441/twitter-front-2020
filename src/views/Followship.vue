<template>
  <div class="container">
    <div class="left-container">
      <Navbar class="Navbar" v-bind:currentUser="currentUser" />
    </div>

    <div class="middle-container">
      <div class="middle-container-wrapper">
        <div class="middle-container-arrow-wrapper">
          <img src="../assets/arrow-left.png" type="button" v-on:click="hasHistory" alt="">
        </div>
        <div class="middle-container-page-title-wrapper">
          <h1>{{ user.name }}</h1>
          <h3>{{ user.tweetsNum }}則推文</h3>
        </div>
      </div>
      <FollowshipNavPills v-on:after-change-followship-nav-pills="afterChangeFollowshipNavPills" />
      <FollowshipSection v-bind:currentUser="currentUser" v-bind:user="user" v-bind:userFollowings="userFollowings"
        v-bind:userFollowers="userFollowers" v-bind:show="show" />
    </div>

    <div class="right-container">
      <FollowingsBar class="FollowingsBar" v-bind:currentUser="currentUser" />
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
import { mapState } from 'vuex'
import { Toast } from '../utils/helpers'

export default {
  components: {
    Navbar,
    FollowingsBar,
    FollowshipNavPills,
    FollowshipSection,
  },
  data() {
    return {
      user: {},
      userFollowings: [],
      userFollowers: [],
      show: 'userFollowers'
    }
  },
  methods: {
    async fetchUser(userId) {
      try {
        const response = await usersAPI.getUser({ userId })
        if (response.status !== 200) {
          throw new Error()
        }
        const data = response.data
        this.user = {
          ...data,
        }
      } catch (error) {
        console.warn(error)
        Toast.fire({
          icon: 'error',
          title: '找不到該位 User',
          timer: 2000,
        })
        this.$router.push({ name: 'not-found' })
        setTimeout(() => {
          this.$router.go(-2)
        }, 1000)
      }
    },
    async fetchUserFollowings(userId) {
      try {
        const response = await usersAPI.getUserFollowings({ userId })
        const data = response.data
        this.userFollowings = data
      } catch (error) {
        console.warn(error)
      }
    },
    async fetchUserFollowers(userId) {
      try {
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
    hasHistory() {
      this.$router.go(-1)
    },
  },
  computed: {
    ...mapState(['currentUser'])
  },
  // created() {
  //   this.fetchUser()
  //   this.fetchUserFollowings()
  //   this.fetchUserFollowers()
  // },
  mounted() {
    const userId = Number(this.$route.params.id)
    this.fetchUser(userId)
    this.fetchUserFollowings(userId)
    this.fetchUserFollowers(userId)
  },
  beforeRouteUpdate(to, from, next) {
    const userId = Number(to.params.id)
    this.fetchUser(userId)
    this.fetchUserFollowings(userId)
    this.fetchUserFollowers(userId)
    next()
  }
}
</script>
