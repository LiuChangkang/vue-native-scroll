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
Vue.use(ScrollView);

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
