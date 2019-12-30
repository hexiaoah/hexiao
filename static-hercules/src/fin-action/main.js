var Vue = require('vue')
var VueRouter = require('vue-router')
var vueResource = require('vue-resource')
var App = require('./App.vue')
import toast from './components/toast/index.js'
import logger from '@2dfire/logger'

Vue.use(toast)
Vue.use(VueRouter)
Vue.use(vueResource)
Vue.http.options.credentials = true

var router = new VueRouter({
  routes: [
    {
      path: '*',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'index',
      title: '活动首页',
      component: require('./views/index/index.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  // 路由变换后，滚动至顶
  window.scrollTo(0, 0)

  next()
})

Vue.use(logger, {
  product: '4.2', //产品线
  project: 'fin_action', //项目名称
  router: router
})

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})
