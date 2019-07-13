// import Vue from 'vue'

import App  from './App.vue'
// import store from './store'
import router from './router'
import store from './store'

import './permission.js'

import 'normalize.css'
import 'element-ui/lib/theme-chalk/index.css'
import './style/index.scss'
// console.log(window.Vue)
Vue.config.productionTip = false

// axios.interceptors.request.use( config => {
// 	console.log(config)
// 	return config
// })
Vue.prototype.$ajax = axios

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
