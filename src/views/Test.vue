<template>
  <div class="container">
    <div class="left-container">
      <Navbar class="Navbar" v-bind:currentUser="currentUser" />
    </div>

    <div class="middle-container">

      <body>

        <button v-on:click="aaa">press</button>
        <h1>test git merge</h1>
        <h1>test git merge(not merge)</h1>
      </body>

    </div>

    <div class="right-container">
      <div class="chat-board-wrapper">
        <div class="chat-board-scroll-wrapper">
          <div class="chat-board-content">
            <div class="chat-board-content-single-wrapper" v-for="message in messages">
              <template v-if="message.type === 'message' && message.user.id !== currentUser.id">
                <div class="chat-board-avatar-wrapper">
                  <router-link class="link" v-bind:to="'/users/' + message.user.id">
                    <img v-bind:src="message.user.avatar" alt="">
                  </router-link>
                </div>
                <div class="chat-board-content-info-wrapper">
                  <div class="chat-board-content-info-text"> {{ message.msg }}</div>
                  <div class="chat-board-content-info-date"> {{ message.time }}</div>
                </div>
              </template>
              <template v-else-if="message.type === 'message' && message.user.id === currentUser.id">
                <div class="chat-board-content-info-wrapper chat-board-content-info-wrapper-reverse">
                  <div class="chat-board-content-info-text chat-board-content-info-text-reverse"> {{ message.msg }}
                  </div>
                  <div class="chat-board-content-info-date"> {{ message.time }}</div>
                </div>
              </template>
              <template v-else>
                <div class="notice-wrapper">
                  <div class="notice-info-text">{{ message.msg }}</div>
                </div>
              </template>
            </div>
          </div>
          <div id="msg_end" style="height:0px; overflow:hidden"></div>
        </div>

        <div class="chat-input-wrapper">
          <textarea class="chat-input-text" style="background-color:#F5F8FA;" cols="30" rows="2"
            v-model="input"></textarea>
          <button class="chat-input-button" @click="test_sendPrivateMsg">Send</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import { mapState } from 'vuex'
import roomsAPI from '../api/rooms'
import eventBus from "../utils/eventBus"

// import Vue from 'vue'
// import store from '../store'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// import VueSocketIO from 'vue-socket.io'
// import SocketIO from 'socket.io-client'

// Vue.config.productionTip = false

// Vue.use(ElementUI)
// Vue.use(new VueSocketIO({
//   debug: true,
//   connection: SocketIO('ws://localhost:3030'),
//   vuex: {
//     store,
//     actionPrefix: 'SOCKET_',
//     mutationPrefix: 'SOCKET_'
//   }
// }))

export default {
  components: {
    Navbar
  },
  name: 'Chat',
  data() {
    return {
      users: [],
      input: '',
      messages: [],
      firstLoadHistoricalMessages: true,
      targetUser: {
        id: 0,
        name: 0,
        account: 0,
        avatar: 0
      }
    }
  },
  // sockets: {
  //   connect() {
  //     this.$message({
  //       message: '?????????????????????',
  //       type: 'success'
  //     })
  //   },
  //   disconnect() {
  //     this.$message({
  //       message: '?????????????????????',
  //       type: 'error'
  //     })
  //   },
  //   get_socket_id(socketId) {
  //     this.currentUser.socketId = socketId
  //   },
  //   async broadcast_msg_private(data) {
  //     try {
  //       // ???????????????????????????????????????????????????????????????(targetUser)???????????????????????????(currentUser)???????????????????????????messages
  //       // ????????????????????? A ???????????? B ???????????????????????????????????? A ?????????????????????
  //       if (data.senderId === this.targetUser.id || data.senderId === this.currentUser.id) {
  //         this.messages.push({
  //           type: data.type,
  //           msg: data.inputText,
  //           time: data.time,
  //           user: {
  //             ...data.user
  //           }
  //         })
  //       } else {
  //         // ?????????????????????????????????????????????????????????(currentUser)????????????????????????????????????(targetUser)???
  //         // ???????????? user-wrapper ???????????????(????????????????????? + ??????)
  //         const userWrapperUnreadCount = document.querySelector(`#user-wrapper-unread-count${data.senderId}`)
  //         userWrapperUnreadCount.classList.remove('user-wrapper-unread-count-hidden')
  //         if (Number(userWrapperUnreadCount.textContent) < 99) {
  //           userWrapperUnreadCount.textContent = Number(userWrapperUnreadCount.textContent) + 1
  //         }
  //         // ?????????????????????????????????????????? + ??????
  //         const formData = {
  //           unread: true,
  //           senderOrTargetUserId: data.senderId,
  //           userUnreadNum: Number(userWrapperUnreadCount.textContent)
  //         }
  //         const response = await roomsAPI.updateUserUnreadNum({ formData })
  //         if (response.status !== 200) {
  //           throw new Error()
  //         }
  //       }
  //       this.dataToBrotherNavbar()
  //     } catch (error) {
  //       console.warn(error)
  //     }
  //   },
  //   historical_messages(data) {
  //     data.forEach(message => {
  //       this.messages.push({
  //         type: 'message',
  //         msg: message.text,
  //         time: message.createdAt,
  //         user: {
  //           ...message.User
  //         }
  //       })
  //     })

  //     // ??????Chat.vue????????????????????????????????????????????????scrollbar??????????????????
  //     if (this.firstLoadHistoricalMessages) {
  //       setTimeout(() => {
  //         // this.firstLoadHistoricalMessages = false
  //         this.endScrollbar()
  //       }, 1)
  //     }
  //   }
  // },
  methods: {
    async fetchConnectedUsers() {
      try {
        const response = await roomsAPI.getConnectedUsers()
        if (response.status !== 200) {
          throw new Error()
        }
        this.users = response.data
      } catch (error) {
        console.warn(error)
        Toast.fire({
          icon: 'error',
          title: '?????????????????? Tweets??????????????????',
          timer: 2000,
        })
      }
    },
    enter_chat_private() {
      this.$socket.emit('enter_chat_private', {
        user: {
          id: this.currentUser.id,
          name: this.currentUser.name,
          account: this.currentUser.account,
          avatar: this.currentUser.avatar
        }
      })
    },
    async test_openPrivateChat(id) {
      try {
        // ??????????????????????????? + ????????????
        const userWrapperUnreadCount = document.querySelector(`#user-wrapper-unread-count${id}`)
        userWrapperUnreadCount.classList.add('user-wrapper-unread-count-hidden')
        userWrapperUnreadCount.textContent = 0
        // ?????????????????????????????????????????? + ??????
        const formData = {
          unread: false,
          senderOrTargetUserId: id,
          userUnreadNum: 0
        }
        roomsAPI.updateUserUnreadNum({ formData })
        // const response = await roomsAPI.updateUserUnreadNum({ formData })

        this.messages = []
        let currentUserId = this.currentUser.id
        let targetUserId = id
        this.users.forEach(user => {
          if (user.id === id) {
            this.targetUser = {
              ...user,
            }
          }
        })
        this.$socket.emit('test_historical_messages_private', {
          type: 'get_historical_messages_private',
          currentUserId: currentUserId,
          targetUserId: targetUserId
        })
      } catch (error) {
        console.warn(error)
      }
    },
    test_sendPrivateMsg() {
      this.$socket.emit('test_send_private_msg', {
        inputText: this.input,
        user1: this.currentUser,
        user2: this.targetUser,
      })
      this.input = ''
    },
    endScrollbar() {
      const msg_end = document.querySelector('#msg_end')
      msg_end.scrollIntoView()
    },
    dataToBrotherNavbar() {
      eventBus.$emit("showRedSpot", 'showRedSpot');
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  mounted() {
    this.enter_chat_private()
    this.fetchConnectedUsers()
  },
  async beforeUpdate() {
    // ??? UserBoard.vue ?????? icon-messege ?????????????????????????????? query ???????????????????????????????????????
    if (this.$route.query.userId) {
      // ?????? query.userId ???????????????????????????????????? ConnectedUsers ???
      const targetUserId = Number(this.$route.query.userId)
      const existedConnectedUsersId = []
      this.users.forEach(user => {
        existedConnectedUsersId.push(user.id)
      })

      if (existedConnectedUsersId.includes(targetUserId)) {
        // ?????? query.userId ?????????????????????????????? ConnectedUsers ???
        // ?????????????????????????????????(openPrivateChat)
        this.test_openPrivateChat(targetUserId)
      } else {
        // ?????? query.userId ?????????????????????????????? ConnectedUsers ???
        // ???????????? Room????????? targetUser ?????????????????????????????????????????????????????????(openPrivateChat)
        const formData = { targetUserId: targetUserId }
        const response = await roomsAPI.createChatRoom({ formData })
        this.users.push({
          ...response.data.targetUser,
        })
        this.test_openPrivateChat(data.targetUser.id)
      }

      // ??????URL???????????????????????????????????????????????????????????? query ??????????????????????????????
      this.$router.push({ query: {} })
    }
  },
}
</script>
???
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* === */
/* === */
/* === */
/* middle-container */

.users-wrapper {
  display: flex;
  flex-direction: column;
}

.users-scroll-wrapper {
  overflow: auto;
}

.users {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.user-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 15px;
  border-top: 1px solid #E6ECF0;
}

.user-wrapper-private {
  cursor: pointer;
}

.user-wrapper-user-avatar-wrapper img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
}

.user-wrapper-user-name {
  margin-left: 10px;
  margin-right: 5px;
  font-weight: 700;
  font-size: 15px;
  line-height: 22px;
  color: #1C1C1C;
}

.tuser-wrapper-user-account {
  font-weight: 500;
  font-size: 15px;
  line-height: 22px;
  color: #657786;
}

/* === */
/* === */
/* === */
/* right-container */

.chat-board-wrapper {
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  justify-content: end;
  width: 500px;
  height: 100vh;
  min-height: 0px;
  padding: 17px 0px;
}

.chat-board-scroll-wrapper {
  overflow: auto;
}

.chat-board-content {
  display: flex;
  flex-direction: column;
  justify-content: end;
  /* height: 100%; */
  padding: 0px 15px;
  text-align: left;
}

.chat-board-content-single-wrapper {
  width: 100%;
  display: flex;
  flex-direction: row;
  margin: 2.5px 0px;
}

.chat-board-avatar-wrapper {
  display: flex;
  align-items: end;
  padding-bottom: 19px;
}

.chat-board-avatar-wrapper img {
  width: 36px;
  height: 36px;
  object-fit: cover;
  border-radius: 50%;
}

.chat-board-content-info-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-left: 5px;
}

.chat-board-content-info-wrapper-reverse {
  align-items: end;
  margin-right: 5px;
}

.chat-board-content-info-text {
  max-width: 75%;
  padding: 5px 10px;
  border-radius: 15px 10px 10px 0px;
  background: #E6ECF0;
  word-break: break-all;
}

.chat-board-content-info-text-reverse {
  border-radius: 10px 15px 0px 10px;
  background-color: var(--orange);
  color: var(--white);
}

.chat-board-content-info-date {
  font-weight: 500;
  font-size: 13px;
  line-height: 19px;
  color: #657786;
}

.notice-wrapper {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.notice-info-text {
  padding: 5px 10px;
  border-radius: 15px;
  font-weight: 500;
  font-size: 13px;
  line-height: 20px;
  color: #657786;
  background: #E6ECF0;
}

.chat-input-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px 15px 0px;
  border-top: 1px solid #E6ECF0;
}

.chat-input-text {
  width: 100%;
  height: 36px;
  padding: 0px 15px;
  margin: 0px;
  margin-right: 10px;
  border-radius: 18px;
  resize: none;
  /* background-color: inline-style-setting; */
}

.chat-input-button {
  width: 70px;
  height: 36px;
  margin: 0px;
  padding: 0px;
  border-radius: 18px;
  background-color: var(--orange);
  color: var(--white);
  border: 1px solid var(--orange);
}

.chat-input-button:disabled {
  background-color: var(--white);
  color: #606266;
  border: 1px solid #606266;
}

/* ????????????????????????????????????????????? */
.user-wrapper-unread-count {
  position: absolute;
  width: 20px;
  height: 20px;
  color: aliceblue;
  font-size: 10px;
  line-height: 20px;
  font-weight: 700;
  text-align: center;
  background-color: firebrick;
  border-radius: 50%;
  transform: translate(180%, -90%);
}

.user-wrapper-unread-count-hidden {
  visibility: hidden;
}
</style>