import Vue from 'vue'
import VueRouter from 'vue-router'
import vueResource from 'vue-resource'
import App from './App'
import { getFace } from './utils'
Vue.use(VueRouter)
Vue.use(vueResource)
Vue.http.options.xhr = { withCredentials: true }
// Vue.http.headers.common['env'] = 'f39d79f58d68411cb4d680a8c8b86d9d'
const router = new VueRouter({
  routes: [
    {
      path: '*',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'index',
      title: '刷脸入口',
      component: require('./views/index/index.vue')
    },
    {
      path: '/face',
      name: 'face',
      title: '刷脸设置',
      component: require('./views/face/index.vue')
    },
    {
      path: '/complete',
      name: 'complete',
      title: '拍照完成',
      component: require('./views/complete/index.vue')
    },
    {
      path: '/success',
      name: 'success',
      title: '验证成功',
      component: require('./views/success/index.vue')
    },
    {
      path: '/setting',
      name: 'setting',
      title: '设置',
      component: require('./views/setting/index.vue')
    },
    {
      path: '/protocol',
      name: 'protocol',
      title: '二维火人脸识别服务协议',
      component: require('./views/protocol/index.vue')
    }
  ],
  scrollBehavior() {
    // 路由变换后，滚动至顶
    return { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  // if (!getFace('agreement') && to.name !== 'index') {
  //   return next({
  //     path: '/index',
  //     replace: true
  //   })
  // }
  next()
})

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})
