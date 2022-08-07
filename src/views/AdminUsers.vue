<template>
  <div class="container">
    <div class="left-container">
      <NavBarAdmin class="NavBarAdmin" v-bind:currentUser="currentUser"
        v-bind:currentViewPageName="currentViewPageName" />
    </div>
    <div class="middle-container">
      <h1>使用者列表</h1>
      <AdminUsersSection v-bind:users="users" />
    </div>
  </div>
</template>

<script>
import NavBarAdmin from '../components/NavBarAdmin.vue'
import AdminUsersSection from '../components/AdminUsersSection.vue'
import authorizationAPI from '../api/authorization'
import { mapState } from 'vuex'

export default {
  components: {
    NavBarAdmin,
    AdminUsersSection,
  },
  data() {
    return {
      currentViewPageName: '',
      users: [],
    }
  },
  methods: {
    async fetchAdminUsers() {
      try {
        const response = await authorizationAPI.getUsers()
        if (response.statusText !== 'OK') {
          throw new Error()
        }
        this.users = response.data
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
    this.fetchAdminUsers()
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
  width: 1055px;
  margin-left: 240px;
  margin-right: 30px;
  border-left: 1px solid #E6ECF0;
  border-right: 1px solid #E6ECF0;
}
</style>