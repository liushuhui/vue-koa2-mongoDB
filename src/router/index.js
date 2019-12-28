import Vue from 'vue'
import Router from 'vue-router'
import shopingMall from '@/components/page/shopingMall/shopingMall'
import register from '@/components/page/register/register'
import login from '@/components/page/login/login'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'shopingMall',
      component: shopingMall
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/login',
      name: login,
      component: login
    }
  ]
})
