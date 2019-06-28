import Vue from 'vue'
import Router from 'vue-router'
// 引入Login组件
import Login from './views/Login.vue'
// 引入Home组件
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/',
      component: Login
    },
    {
      path: '/home',
      component: Home
    }
  ]
})