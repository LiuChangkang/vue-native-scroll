<template>
  <div id="app">
    <div>test</div>
    <div>test</div>
    <div>test</div>
    <div>test</div>
    <div>test</div>
    <scroll-view height="60vh" ref="scrollView" style="flex: auto">
      <template v-slot:before>
        这是开头的插槽
      </template>

      <img alt="Vue logo" src="./assets/logo.png">
      <HelloWorld msg="Welcome to Your Vue.js App"/>

      <template v-slot:after>
        这是结尾的插槽
      </template>
    </scroll-view>
    <div>test</div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  methods: {

  },
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
