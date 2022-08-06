<template>
  <div class="container">
    <div class="left-container">
      <NavBarAdmin class="NavBarAdmin" v-bind:currentUser="currentUser"
        v-bind:currentViewPageName="currentViewPageName" />
    </div>
    <div class="middle-container">
      <h1>推文清單</h1>
      <AdminTweetsSection v-bind:propTweets="tweets" />
    </div>
  </div>
</template>

<script>
import NavBarAdmin from '../components/NavBarAdmin.vue'
import AdminTweetsSection from '../components/AdminTweetsSection.vue'
import authorizationAPI from '../api/authorization'
import { mapState } from 'vuex'

export default {
  components: {
    NavBarAdmin,
    AdminTweetsSection,
  },
  data() {
    return {
      currentViewPageName: '',
      tweets: [],
    }
  },
  methods: {
    async fetchAdminTweets() {
      try {
        const response = await authorizationAPI.getTweets()
        if (response.statusText !== 'OK') {
          throw new Error()
        }
        this.tweets = response.data
      } catch (error) {
        console.warn(error)
      }
    },
  },
  computed: {
    ...mapState(['currentUser'])
  },
  mounted() {
    this.currentViewPageName = this.$route.name
    this.fetchAdminTweets()
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