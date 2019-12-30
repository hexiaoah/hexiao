var Vue = require("vue");
var vueResource = require("vue-resource");
var App = require('./App.vue');
import router from './router';

import AnalysisUI from '@2dfire/analysis-ui'
Vue.use(AnalysisUI)
Vue.use(vueResource);
Vue.http.options.credentials = true;

router.beforeEach((to, from, next) => {
	// 路由变换后，滚动至顶
	window.scrollTo(0, 0)

	next()
})
sessionStorage.setItem('project','analysisUI')
new Vue({
	el: '#app',
	router,
	template: "<App/>",
	components: {
		App
	},
});