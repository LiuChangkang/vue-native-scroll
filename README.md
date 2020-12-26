# vue-native-scroll
<a href="https://www.npmjs.com/package/vue-native-scroll"><img src="https://img.shields.io/npm/v/vue-native-scroll.svg?sanitize=true" alt="Version"></a>

> 原生滚动插件，解决ios和安卓上web浏览器元素在局部div内滚动产生的问题。

## install
```
npm install vue-native-scroll --save

yarn add vue-native-scroll
```

## usage
```
import Vue from 'vue'
import ScrollView from 'vue-native-scroll';
Vue.use(ScrollView, {
  name: 'scroll-view' // 全局component名，默认ScrollView
});

<template>
  <scroll-view>
    <div>滚动条内部</div>
  </scroll-view>
</template>

或

import ScrollView from 'vue-native-scroll';
new Vue({
  components: {
    'scroll-view': ScrollView
  }
});
```

## tip
```
配合vant的PullRefresh组件可以实现局部区域的下拉刷新。
```
