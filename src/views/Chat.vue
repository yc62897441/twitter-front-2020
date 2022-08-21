<template>
  <div class="container">
    <div class="left-container">
      <Navbar class="Navbar" v-bind:currentUser="currentUser" />
    </div>

    <div class="middle-container">
      <div>上線使用者</div>
    </div>

    <div class="right-container">

      <div class="chat-board-wrapper">
        <div class="chat-board-content">

          <div class="chat-board-content-single-wrapper" v-for="message in messages">
            <template v-if="message.type === 'message'">
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
            <template v-else>
              <div class="notice-wrapper">
                <div class="notice-info-text">{{ message.msg }}</div>
              </div>
            </template>
          </div>
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

const ENTER = 0
const LEAVE = 1

export default {
  components: {
    Navbar
  },
  name: 'Chat',
  data() {
    return {
      input: '',
      content: '',
      message: '',
      messages: []
    }
  },
  sockets: {
    connect() {
      this.$message({
        message: '連線成功！！！',
        type: 'success'
      })
    },
    disconnect() {
      this.$message({
        message: '連線解除！！！',
        type: 'error'
      })
    },
    broadcast_msg(data) {
      if (data.type === 'message') {
        this.messages.push({
          type: data.type,
          msg: data.inputText,
          time: data.time,
          user: {
            ...data.user
          }
        })
      } else {
        this.messages.push({
          type: data.type,
          msg: data.inputText
        })
      }
    }
  },
  methods: {
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
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
}
</script>
​
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chat-board-wrapper {
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 500px;
  height: 100vh;
  padding: 17px 0px;
}

.chat-board-content {
  display: flex;
  flex-direction: column;
  justify-content: end;
  height: 100%;
  padding: 0px 15px;
  text-align: left;
}

.chat-board-content-single-wrapper {
  width: 100%;
  display: flex;
  flex-direction: row;
  margin: 2.5px 0px;
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
  margin-left: 5px;
}

.chat-board-content-info-text {
  max-width: 75%;
  padding: 5px;
  padding-left: 10px;
  border-radius: 15px;
  background: #E6ECF0;
  word-break: break-all;
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