<template>
  <div id="app">
    <div style="height: 30px">无限滚动</div>
    <scroll-view ref="scroll" class="scroll-body" @scroll="scroll" @touchstart.native="touchstart" @touchend.native="touchend">
      <img alt="Vue logo" src="./assets/logo.png">
      <ul :style="{paddingTop: paddingTop + 'px', paddingBottom: paddingBottom + 'px'}">
        <li v-for="(item, index) in showListData" :key="index" ref="showItem">
          {{ item }}
        </li>
      </ul>
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
    scroll() {
      const distance = this.$refs.scroll.scrollDistance();
      const isUp = distance.top > this.prevTop;
      const step = Math.floor(Math.abs(distance.top - this.prevTop) / 66) + 3
      if (distance.bottom < this.loadThreshold && isUp) {
        this.addList()
      } else if (distance.top > 0) {
        if (isUp) {
          this.showBottomElement(step) || this.hideTopElement(step)
        } else {
          this.showTopElement(step) || this.hideBottomElement(step)
        }
      }
      this.prevTop = distance.top
    },
    touchstart() {
      this.hideTopElement(30)
      this.hideBottomElement(30)
    },
    touchend() {
      this.showTopElement(30)
      this.showBottomElement(30)
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
  .scroll-body{
    height: calc(100vh - 30px);
  }
</style>
