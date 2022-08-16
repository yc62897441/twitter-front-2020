<template>
  <div class="container">
    <div class="left-container">
      <NavBarAdmin class="NavBarAdmin" v-bind:currentUser="currentUser"
        v-bind:currentViewPageName="currentViewPageName" />
    </div>
    <div class="admin-middle-container">
      <h1>使用者列表</h1>
      <div class="admin-control-button-wrapper">
        <button class="btn btn-admin-control" v-on:click="recountUserTweetsRepliesLikesNum"
          v-bind:disabled="isProcessing">重新計算使用者推文、回復、喜歡數量</button>
        <button class="btn btn-admin-control" v-on:click="recountUserFollowersNum"
          v-bind:disabled="isProcessing">重新計算使用者跟隨者數量</button>
      </div>
      <AdminUsersSection v-bind:users="users" />
    </div>
  </div>
</template>

<script>
import NavBarAdmin from '../components/NavBarAdmin.vue'
import AdminUsersSection from '../components/AdminUsersSection.vue'
import authorizationAPI from '../api/authorization'
import { mapState } from 'vuex'
import { Toast } from '../utils/helpers'

export default {
  components: {
    NavBarAdmin,
    AdminUsersSection,
  },
  data() {
    return {
      currentViewPageName: '',
      users: [],
      isProcessing: false,
    }
  },
  methods: {
    async fetchAdminUsers() {
      try {
        const response = await authorizationAPI.getUsers()
        if (response.status !== 200) {
          throw new Error()
        }
        this.users = response.data
      } catch (error) {
        console.warn(error)
        Toast.fire({
          icon: 'error',
          title: '無法讀取 Users',
          timer: 2000,
        })
      }
    },
    async recountUserTweetsRepliesLikesNum() {
      try {
        this.isProcessing = true
        const response = await authorizationAPI.recountUserTweetsRepliesLikesNum()
        if (response.data.status !== 'success') {
          throw new Error()
        }
        this.isProcessing = false
        this.$router.go(0)
      } catch (error) {
        this.isProcessing = false
        console.warn(error)
      }
    },
    async recountUserFollowersNum() {
      try {
        this.isProcessing = true
        const response = await authorizationAPI.recountUserFollowersNum()
        if (response.data.status !== 'success') {
          throw new Error()
        }
        this.isProcessing = false
        this.$router.go(0)
      } catch (error) {
        this.isProcessing = false
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
.admin-middle-container {
  position: relative;
}

.admin-control-button-wrapper {
  position: absolute;
  top: 9px;
  left: 507px;

}

.btn-admin-control {
  background-color: var(--orange);
  color: var(--white);
  border-radius: 18px;
  margin-right: 5px;
}
</style>