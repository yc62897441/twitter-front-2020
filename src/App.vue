<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
// 全域樣式可以外部引入
import '../src/style.css'
import '../src/style_signin_signup.css'
export default {
  name: 'App'
}
</script>

<!-- 全域樣式可以寫在這邊 -->
<style>
</style>