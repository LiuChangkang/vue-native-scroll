<template>
  <div id="app">
    <div>基于此插件的无限滚动</div>
    <scroll-view ref="scrollView" style="flex: auto" @scroll="scroll" @touchstart.native="touchstart" @touchend.native="touchend">
      <template v-slot:before>
        <div class="scroll-header">
          这是开头的插槽
        </div>
      </template>

      <img alt="Vue logo" src="./assets/logo.png">
      <ul :style="{paddingTop: paddingTop + 'px', paddingBottom: paddingBottom + 'px'}">
        <li v-for="(item, index) in showListData" :key="index" ref="showItem">
          {{ item }}
        </li>
      </ul>

      <template v-slot:after>
        这是结尾的插槽
      </template>
    </scroll-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      listData: [],
      showBeginIndex: 0,
      showEndIndex: 0,
      paddingTop: 0,
      paddingBottom: 0,
      prevTimestamp: +new Date(),
      loadThreshold: 50,
      prevTop: 0
    }
  },
  computed: {
    showListData() {
      return this.listData.slice(this.showBeginIndex, this.showEndIndex)
    }
  },
  methods: {
    addList() {
      for (let i = 0; i < 30; i++) {
        this.listData.push('item ' + this.listData.length)
        this.showEndIndex++
      }
    },
    scroll(e) {
      const isUp = e.distance.top > this.prevTop
      const step = Math.floor(Math.abs(e.distance.top - this.prevTop) / 66) + 3
      if (e.distance.bottom < this.loadThreshold && isUp) {
        this.addList()
      } else if (e.distance.top > 0) {
        if (isUp) {
          this.showBottomElement(step) || this.hideTopElement(step)
        } else {
          this.showTopElement(step) || this.hideBottomElement(step)
        }
      }
      this.prevTop = e.distance.top
    },
    touchstart() {
      this.hideTopElement(9)
      this.hideBottomElement(9)
    },
    touchend() {
      this.showTopElement(9)
      this.showBottomElement(9)
    },
    showTopElement(count = 1) {
      if (this.$refs.showItem[0].getBoundingClientRect().top > -99 && this.showBeginIndex > 0) {
        this.showBeginIndex--
        this.$nextTick(() => {
          const height = parseFloat(window.getComputedStyle(this.$refs.showItem[0], null).height)
          this.paddingTop -= height
          count > 0 && this.showTopElement(count - 1)
        })
        return true
      } else {
        return false
      }
    },
    showBottomElement(count = 1) {
      if (this.$refs.showItem[this.$refs.showItem.length - 1].getBoundingClientRect().top < document.documentElement.clientHeight + 99 && this.showEndIndex < this.listData.length - 1) {
        this.showEndIndex++
        this.$nextTick(() => {
          const height = parseFloat(window.getComputedStyle(this.$refs.showItem[this.$refs.showItem.length - 1], null).height)
          this.paddingBottom -= height
          count > 0 && this.showBottomElement(count - 1)
        })
        return true
      } else {
        return false
      }
    },
    hideTopElement(count = 1) {
      if (this.$refs.showItem[0].getBoundingClientRect().bottom < -9 && this.showBeginIndex < this.showEndIndex - 1) {
        const height = parseFloat(window.getComputedStyle(this.$refs.showItem[0], null).height)
        this.paddingTop += height
        this.showBeginIndex++
        count > 0 && this.$nextTick(() => this.hideTopElement(count - 1))
        return true
      } else {
        return false
      }
    },
    hideBottomElement(count = 1) {
      const lastItem = this.$refs.showItem[this.$refs.showItem.length - 1]
      if (lastItem.getBoundingClientRect().top > document.documentElement.clientHeight + this.loadThreshold && this.showBeginIndex < this.showEndIndex - 1) {
        const height = parseFloat(window.getComputedStyle(lastItem, null).height)
        this.paddingBottom += height
        this.showEndIndex--
        count > 0 && this.$nextTick(() => this.hideBottomElement(count - 1))
        return true
      } else {
        return false
      }
    }
  },
  components: {
    // HelloWorld
  },
  mounted() {
    this.addList()
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
  .scroll-header{
    position: absolute;
    bottom: 100%;
  }
  ul{
    padding: 0 15px;
    margin: 0;
    list-style: none;
  }
  li{
    text-align: left;
    line-height: 36px;
  }
</style>
