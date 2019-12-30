import Route from "@2dfire/utils/router";
import sessionStorage from "@2dfire/utils/sessionStorage";

var Vue = require("vue");
var Router = require("vue-router");
Vue.use(Router);
var App = require('./App.vue');

sessionStorage.setItem('id', encodeURIComponent(Route.route.query["id"]));
import Charts from '@2dfire/charts'
import '@2dfire/charts/dist/charts.css'
Vue.use(Charts);

// 开启debug模式
Vue.config.debug = true;

var router = new Router({
    routes: [{
        path: "*",
        redirect: "/index"
    }, {
        path: "/index",
        name: "index",
        title: "活动首页",
        component: require("./views/index.vue")
    }]
});

/**
 * 埋点
 * */
import logger from '@2dfire/logger'
console.log('****************',logger)

Vue.use(logger, {
    product: '7.1',    //产品线
    project: 'shop_exam',    //项目名称
    router: router
});

new Vue({
    el: '#app',
    router,
    template: "<App/>",
    components: {App},
});
