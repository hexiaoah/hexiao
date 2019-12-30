var Vue = require("vue");
var VueRouter = require("vue-router");
import toast from './components/toast/index.js'
import confirm from './components/confirm/index.js'
import logger from '@2dfire/logger'

// var vueResource = require("vue-resource");
var App = require('./App.vue');


Vue.use(VueRouter);
// Vue.use(vueResource);

Vue.use(toast)
Vue.use(confirm)

Vue.http.options.credentials = true;

var router = new VueRouter({
	routes: [{
		path: "*",
		redirect: "/index"
	}, {
		path: "/index",
		name: "开店采购",
		title: "开店采购",
		component: require("./views/index/index.vue")
	}]
});

Vue.use(logger, {
	product: '8.0', //产品线
	project: 'online_sell', //项目名称
	router: router
});

router.beforeEach((to, from, next) => {
	// 路由变换后，滚动至顶
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