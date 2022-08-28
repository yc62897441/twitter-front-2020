import { mapState } from 'vuex'
import Vue from 'vue'
import store from '../store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(new VueSocketIO({
  debug: true,
  connection: SocketIO('ws://localhost:3030'),
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  },
  sockets:{
    async broadcast_msg_private(data) {
      try {
        console.log('broadcast_msg_private')
        // // 當傳來的訊息的寄送者，是目前正在聊天的對象(targetUser)，或是使用者本人時(currentUser)，才新增到畫面上的messages
        // // 避免目前正在跟 A 聊天，而 B 傳來的訊息會顯示到自己與 A 的私聊訊息串中
        // if (data.senderId === this.targetUser.id || data.senderId === this.currentUser.id) {
        //   this.messages.push({
        //     type: data.type,
        //     msg: data.inputText,
        //     time: data.time,
        //     user: {
        //       ...data.user
        //     }
        //   })
        // } else {
        //   // 當傳來的訊息的寄送者，不是使用者本人時(currentUser)，且也不是正在聊天的對象(targetUser)時
        //   // 寄送者的 user-wrapper 顯示紅點點(未讀訊息的狀態 + 數量)
        //   const userWrapperUnreadCount = document.querySelector(`#user-wrapper-unread-count${data.senderId}`)
        //   userWrapperUnreadCount.classList.remove('user-wrapper-unread-count-hidden')
        //   if (Number(userWrapperUnreadCount.textContent) < 99) {
        //     userWrapperUnreadCount.textContent = Number(userWrapperUnreadCount.textContent) + 1
        //   }
        //   // 傳送後端，記錄未讀訊息的狀態 + 數量
        //   const formData = {
        //     unread: true,
        //     senderOrTargetUserId: data.senderId,
        //     userUnreadNum: Number(userWrapperUnreadCount.textContent)
        //   }
        //   const response = await roomsAPI.updateUserUnreadNum({ formData })
        //   if (response.status !== 200) {
        //     throw new Error()
        //   }
        // }
        // this.dataToBrotherNavbar()
      } catch (error) {
        console.warn(error)
      }
    },
  },
  methods: {
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
  },
  computed: {
    ...mapState(['currentUser'])
  },
  mounted() {
    this.enter_chat_private()
  }
}))