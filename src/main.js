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
