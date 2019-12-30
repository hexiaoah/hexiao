import Vue from 'vue'
import vueResource from 'vue-resource'
import App from './App.vue'
import Router from 'vue-router'
import openApp from '@2dfire/vue-OpenApp'

Vue.use(openApp)
Vue.use(Router)
Vue.use(vueResource)
Vue.http.options.credentials = true;

var router = new Router({
  routes: [
    {
      path: "*",
      redirect: "/index"
    },
    {
      path: "/index",
      name: "index",
      title: "活动首页",
      component: require("./views/loanapply/LoanApply.vue")
    }
  ]
});

router.beforeEach((to, from, next) => {
  // 路由变换后，滚动至顶
  window.scrollTo(0, 0)

  next()
})

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
