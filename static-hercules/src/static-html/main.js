var Vue = require('vue')
var VueRouter = require('vue-router')
var App = require('./App.vue')
import toast from './components/toast/index.js'

Vue.use(toast)
Vue.use(VueRouter)

var router = new VueRouter({
  routes: [
    {
      path: '*',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'index',
      title: '微信商户实名认证流程',
      component: require('./views/index/index.vue')
    },
    {
      path: '/expiration-reminder',
      name: 'index',
      component: require('./views/expiration-reminder/index.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  // 路由变换后，滚动至顶
  window.scrollTo(0, 0)

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
