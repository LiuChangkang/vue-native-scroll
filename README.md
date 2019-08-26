# vue-native-scroll

### 原生滚动插件，解决ios和安卓上元素在div内部滚动产生的问题，持续测试中。。。

###install
```
npm install vue-native-scroll --save
 or
yarn add vue-native-scroll
```


##
```
import Vue from 'vue'
import ScrollView from 'vue-native-scroll';
Vue.use(ScrollView, {
  name: 'scroll-view' // 全局component名，默认scroll-view
  noPreventDefault: false // 是否全局阻止默认touchmove事件，默认true，开启后不需要阻止默认事件的元素添加n-scroll的class名即可
});

<template>
  <scroll-view>
  </scroll-view>
</template>

or

import ScrollView from 'vue-native-scroll';
new Vue({
  components: {
    'scroll-view': ScrollView
  }
});
```
