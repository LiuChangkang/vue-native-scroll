# vue-native-scroll

> 原生滚动插件，解决ios和安卓上元素在局部div内部滚动产生的问题。

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
  name: 'scroll-view' // 全局component名，默认scroll-view
  noPreventDefault: false // 不全局阻止默认touchmove事件，默认false，开启后不需要阻止默认事件的元素添加n-scroll的class名即可
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
1、配合vant的PullRefresh组件可以实现局部区域的下拉刷新。
```
```
2、ios下仅兼容WKWebView，不完全兼容UIWebView上的局部滚动。
```
