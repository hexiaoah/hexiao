var Vue = require("vue");
var VueRouter = require("vue-router");
var vueResource = require("vue-resource");
var App = require('./App.vue');

import {
	router
} from "./router"
import FireUi from '@2dfire/fire-ui'
import '@2dfire/fire-ui/dist/index.css'
import logger from '@2dfire/logger'
Vue.use(VueRouter);
Vue.use(vueResource);
Vue.use(FireUi);
Vue.http.options.credentials = true;

Vue.use(logger, {
	product: '2.7', //产品线
	project: 'give_key', //项目名称
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