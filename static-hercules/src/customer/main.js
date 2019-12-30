var Vue = require("vue");
var VueRouter = require("vue-router");
var vueResource = require("vue-resource");
var App = require('./App.vue');
const DFRouter = require("@2dfire/utils/router");
var Notification = require('./components/notify/index');

Vue.use(VueRouter);
Vue.use(Notification)
Vue.use(vueResource);
Vue.http.options.credentials = true;
Vue.http.options.headers = {
    'version': 'sso',
    'sessionId': encodeURIComponent(DFRouter.route.query["st"])
}

var router = new VueRouter({
	routes: [{
		path: "*",
		redirect: "/index"
	}, {
		path: "/index",
		name: "index",
		title: "活动首页",
		component: require("./views/index/index.vue"),
	},{
    path: "/index/result",
    name: "result",
    title: "巡店结果",
    component: require("./views/result.vue"),
  }, {
    path: "/index/result/cardResult",
    name: "cardResult",
    component: require("./views/cardResult.vue"),
  }]
});

router.beforeEach((to, from, next) => {
  // const toDepth = to.path.split('/').length
  // const fromDepth = from.path.split('/').length
  // if (toDepth < fromDepth) {
  //   from.meta.keepAlive = false
  //   to.meta.keepAlive = true
  // }
	window.scrollTo(0, 0)
	next()
})

new Vue({
	el: '#app',
	router,
	template: "<App/>",
	components: {
		App
	},
});