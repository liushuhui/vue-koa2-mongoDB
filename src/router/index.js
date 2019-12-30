import Vue from 'vue'
import Router from 'vue-router'
import shopingMall from '@/components/page/shopingMall/shopingMall'
import register from '@/components/page/register/register'
import login from '@/components/page/login/login'
import main from '@/components/page/main'
import cart from '@/components/page/cart'
import categoryList from '@/components/page/categoryList'
import member from '@/components/page/member'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/main',
      name: main,
      component: main,
      children: [
        {
          path: '/shopingMall',
          name: 'shopingMall',
          component: shopingMall
        },
        {
          path: '/cart',
          name: 'cart',
          component: cart
        },
        {
          path: '/categoryList',
          name: 'categoryList',
          component: categoryList
        },
        {
          path: '/member',
          name: 'member',
          component: member
        },
      ]
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
