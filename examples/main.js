import Vue from 'vue'
import App from './App.vue'
import ScrollView from '../packages/'

Vue.use(ScrollView);
Vue.config.productionTip = false;
console.log(ScrollView);

new Vue({
  render: h => h(App),
}).$mount('#app');
