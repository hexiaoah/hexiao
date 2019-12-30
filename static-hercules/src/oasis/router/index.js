import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/entrance'
    },
    {
      path: '/entrance',
      name: 'entrance',
      meta: {
        title: '支付优惠费率'
      },
      component: resolve =>
        require(['../views/entrance/ApplyEntrance.vue'], resolve)
    },
    {
      path: '/second-entrance',
      name: 'second-entrance',
      component: resolve => require(['../views/entrance/entrance.vue'], resolve)
    },
    {
      path: '/introduce',
      name: 'introduce',
      component: resolve =>
        require(['../views/entrance/introduce.vue'], resolve)
    },
    {
      path: '/input',
      name: 'input',
      component: resolve =>
        require(['../views/inputshopinfo/InputShopInfo.vue'], resolve)
    },
    {
      path: '/view',
      name: 'view',
      component: resolve =>
        require(['../views/viewshopinfo/ViewShopInfo.vue'], resolve)
    },
    {
      path: '/unbind',
      name: 'unbind',
      component: resolve => require(['../views/inactive/result.vue'], resolve)
    },
    {
      path: '/inactive',
      name: 'inactive',
      component: resolve => require(['../views/inactive/index.vue'], resolve)
    },
    {
      path: '/result',
      name: 'result',
      component: resolve =>
        require(['../views/result/ApplyResult.vue'], resolve)
    },
    {
      path: '/natural',
      name: 'natural',
      component: resolve =>
        require(['../views/naturalPerson/index.vue'], resolve)
    }
  ]
})
