var Vue = require('vue')
var VueRouter = require('vue-router')
var vueResource = require('vue-resource')
var App = require('./App.vue')
import Toast from './components/toast';
import AnalysisUI from '@2dfire/analysis-ui'
import openApp from '@2dfire/vue-OpenApp'
sessionStorage.setItem('project','hercules_shop')
sessionStorage.setItem('product','')

Vue.use(openApp)
Vue.use(AnalysisUI)
Vue.use(Toast, {
  defaultType: 'center',
  duration: 2500,
  wordWrap: false,
  width: 'auto'
})
Vue.use(VueRouter)
Vue.use(vueResource)
Vue.http.options.credentials = false
Vue.http.headers.common['env'] = 'f39d79f58d68411cb4d680a8c8b86d9d'

var router = new VueRouter({
  routes: [
    {
      path: '*',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'index',
      title: '试用升级',
      component: require('./views/index')
    },
    {
      path: '/share',
      name: 'share',
      title: '试用分享',
      component: require('./views/share')
    },
    {
      path: '/history',
      name: 'history',
      title: '获赠记录',
      component: require('./views/history')
    },
    {
      path: '/help',
      name: 'help',
      title: '助力',
      component: require('./views/help')
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
