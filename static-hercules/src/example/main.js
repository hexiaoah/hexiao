var Vue = require("vue");
var VueRouter = require("vue-router");

Vue.use(VueRouter);

var App = require('./App.vue');
var Home = require('./views/home.vue');
var Menu = require('./views/menu.vue');
var Account = require('./views/Account.vue');
var AccountUser = require('./views/AccountUser.vue');
var News = require('./views/account/News.vue');
var Message = require('./views/account/Message.vue');

// 开启debug模式
Vue.config.debug = true;

var router = new VueRouter({
  routes: [
    {
      path: "*",
      redirect: "/home"
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/menu',
      name: 'menu',
      component: Menu
    },
    {
      path: '/account',
      name: 'account',
      component: Account,
      // 定义子路由
      subRoutes: {
        '/news': {
          name: 'news',
          component: News
        },
        '/message': {
          name: 'message',
          component: Message
        }
      }
    },
    {
      path: '/account/user',
      name: 'accountUser',
      component: AccountUser
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
  template:"<App/>",
  components: { App },
});
