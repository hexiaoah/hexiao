var Vue = require("vue");
var Router = require("vue-router");
var vueResource = require("vue-resource");
var App = require('./App.vue');
const DFRouter = require("@2dfire/utils/router");

Vue.use(Router);
Vue.use(vueResource);
Vue.http.options.credentials = true;
Vue.http.options.headers = {
  'version': 'sso',
	'sessionId': encodeURIComponent(DFRouter.route.query["session_id"])
     // 'sessionId':'7b%2FTS2QBf0vG7R7JseETosUPKLccPasSzq%2BVMOzu3i3km8Bi2SJCXFosZL1Z7MNERKsjv9Tc%2B5pKWaeOb3OQtw%3D%3D'
}

// import {enableDebug } from '@2dfire/isv-utils/debug'
// enableDebug()


var router = new Router({
	routes: [
		{
			path: "*",
			redirect: "/purchaseDetails"
		},{
			path: "/purchaseDetails",
			name: "purchaseDetails",
			title: "购买详情页",
			component: require("./views/purchaseDetails/index.vue")
		},
        {
            path: "/rule",
            name: "rule",
            title: "规则",
            component: require("./views/rule/index.vue")
        }
	]
  });
router.beforeEach(function (to, from, next) {
	window.scrollTo(0, 0);
	next()
});

new Vue({
	el: '#app',
	router,
	template: '<App/>',
	components: { App }
  })
