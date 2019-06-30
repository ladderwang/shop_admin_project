import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
// 引入element ui插件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入index.css文件
import './assets/index.css'

Vue.config.productionTip = false

// vue使用了element ui
Vue.use(ElementUI)

// 配置axios请求的基路径
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
// 设置请求头的token

axios.interceptors.request.use(function(config) {
  config.headers.Authorization = localStorage.getItem('token')
  return config
})

// 把axios添加到vue的原型上
Vue.prototype.$http = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

// 注册一个全局的导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
    return
  }
  if (localStorage.getItem('token')) {
    next()
    return
  } else {
    router.push('/login')
  }
})
