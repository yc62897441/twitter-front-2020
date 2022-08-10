<template>
  <div class="container">
    <div class="left-container">
      <NavBarAdmin class="NavBarAdmin" v-bind:currentUser="currentUser"
        v-bind:currentViewPageName="currentViewPageName" />
    </div>
    <div class="admin-middle-container">
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
