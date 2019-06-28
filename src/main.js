import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入element ui插件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入index.css文件
import './assets/index.css'

Vue.config.productionTip = false

// vue使用了element ui
Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
