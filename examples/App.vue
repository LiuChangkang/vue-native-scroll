<template>
  <div id="app">
    <div>test</div>
    <scroll-view height="60vh" ref="scrollView" style="flex: auto">
      <img alt="Vue logo" src="./assets/logo.png">
      <HelloWorld msg="Welcome to Your Vue.js App"/>
    </scroll-view>
    <div>test</div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
  }
}
</script>

<style>
  body{
    margin: 0;
  }
  #app {
    display: flex;
    overflow: hidden;
    height: 100vh;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    flex-direction: column;
    justify-content: space-between;
  }
</style>
