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
            <div class="chat-board-avatar-wrapper">
              <img src="../assets/avatar-photo.png" alt="">
            </div>
            <div class="chat-board-content-info-wrapper">
              <div class="chat-board-content-info-text"> {{ message.msg }}</div>
              <div class="chat-board-content-info-date"> {{ message.time }}</div>
            </div>
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
        message: '连接成功！！！',
        type: 'success'
      });

    },
    disconnect() {
      this.$message({
        message: '连接断开！！！',
        type: 'error'
      })
    },
    broadcast_msg(data) {
      this.messages.push({
        msg: data.msg.split(':')[1],
        time: data.time
      })

      // const content = document.querySelector('.chat-board-content')
      // let div = document.createElement('div')
      // div.innerText = `${data.msg} ---${data.time}`
      // if (data.type === ENTER) {
      //   div.style.color = 'green'
      // } else if (data.type === LEAVE) {
      //   div.style.color = 'red'
      // } else {
      //   div.style.color = 'blue'
      // }
      // content.appendChild(div)

    }
  },
  methods: {
    sendMsg() {
      this.$socket.emit('send_msg', this.input)
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