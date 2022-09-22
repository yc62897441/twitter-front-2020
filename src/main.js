import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'

// 向下滾動載入更多資料
import infiniteScroll from 'vue-infinite-scroll'

Vue.config.productionTip = false

Vue.use(ElementUI)

// 向下滾動載入更多資料
Vue.use(infiniteScroll)

Vue.use(new VueSocketIO({
  debug: true,
  // 本地端 使用
  connection: SocketIO('ws://localhost:3030'),
  // heroku 使用
  // connection: SocketIO('/', { transports: ['websocket'] }),
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  }
}))

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
