var Vue = require("vue");
var Router = require("vue-router");
var vueResource = require("vue-resource");
var App = require('./App.vue');

Vue.use(Router);
Vue.use(vueResource);
Vue.http.options.credentials = true;

var router = new Router({
		routes: [
				{
						path: "*",
						redirect: "/index"
				}, {
						path: "/index",
						name: "index",
						title: "活动首页",
						component: require("./views/index/index.vue")
				}, {
						path: "/code",
						name: "code",
						title: "验证码",
						component: require("./views/ver_code/index.vue")
				}, {
						path: "/success",
						name: "success",
						title: "成功页面",
						component: require("./components/login.vue")
				}, {
						path: "/lose",
						name: "lose",
						title: "失败页面",
						component: require("./components/err.vue")
				}, {
						path: "/scan",
						name: "scan",
						title: "扫码页面",
						component: require("./views/scan_code/index.vue")
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
	template:"<App/>",
	components: { App },
});