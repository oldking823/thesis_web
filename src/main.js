import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
//引入 echarts
import * as echarts from 'echarts'  //引入echarts
Vue.prototype.$echarts = echarts  //挂载在全局



Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
