<template>
  <div class="container">
    <div class="left-container">
      <Navbar class="Navbar" v-bind:currentUser="currentUser" />
    </div>

    <div class="middle-container">
      <h1>上線使用者</h1>
      <div class="users-wrapper">

        <div class="users-scroll-wrapper">

          <div class="users">
            <div class="user-wrapper" v-for="user in users">
              <div class="user-wrapper-user-avatar-wrapper">
                <router-link class="link" v-bind:to="'/users/' + user.id">
                  <img v-bind:src="user.avatar" alt="">
                </router-link>
              </div>
              <div class="user-wrapper-user-name">{{ user.name }}</div>
              <div class="user-wrapper-user-account">@{{ user.account }}</div>
            </div>
          </div>
        </div>
      </div>
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
          <button class="chat-input-button" @click="sendMsg">Send</button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import { mapState } from 'vuex'

import Vue from 'vue'
import store from '../store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'

Vue.config.productionTip = false

Vue.use(ElementUI)
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
      firstLoadHistoricalMessages: true
    }
  },
  // sockets: {
  //   connect() {
  //     this.$message({
  //       message: '連線成功！！！',
  //       type: 'success'
  //     })
  //   },
  //   disconnect() {
  //     this.$message({
  //       message: '連線解除！！！',
  //       type: 'error'
  //     })
  //   },
  //   update_users(data) {
  //     this.users = data
  //   },
  //   broadcast_msg(data) {
  //     if (data.type === 'message') {
  //       this.messages.push({
  //         type: data.type,
  //         msg: data.inputText,
  //         time: data.time,
  //         user: {
  //           ...data.user
  //         }
  //       })
  //     } else {
  //       this.messages.push({
  //         type: data.type,
  //         msg: data.inputText
  //       })
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

  //     // 進入Chat.vue，第一次載入歷史訊息後，聊天訊息scrollbar自動移到最底
  //     if (this.firstLoadHistoricalMessages) {
  //       setTimeout(() => {
  //         this.firstLoadHistoricalMessages = false
  //         this.endScrollbar()
  //       }, 1)
  //     }
  //   }
  // },
  methods: {
    enter_chat() {
      this.$socket.emit('enter_chat', {
        user: {
          id: this.currentUser.id,
          name: this.currentUser.name,
          account: this.currentUser.account,
          avatar: this.currentUser.avatar
        }
      })
    },
    historical_messages() {
      this.$socket.emit('historical_messages', {
        noUse: 'noUse'
      })
    },
    sendMsg() {
      this.$socket.emit('send_msg', {
        inputText: this.input,
        user: {
          id: this.currentUser.id,
          name: this.currentUser.name,
          avatar: this.currentUser.avatar
        }
      })
      this.input = ''
    },
    endScrollbar() {
      const msg_end = document.querySelector('#msg_end')
      msg_end.scrollIntoView()
    },
  },
  computed: {
    ...mapState(['currentUser'])
  },
  mounted() {
    this.enter_chat()
    this.historical_messages()
  },
  beforeDestroy() {
    this.$socket.emit('remove_user', {
      user: {
        id: this.currentUser.id,
        name: this.currentUser.name,
        avatar: this.currentUser.avatar
      }
    })
  }
}
</script>
​
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
</style>