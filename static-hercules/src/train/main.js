var Vue = require("vue");
var VueRouter = require("vue-router");
var vueResource = require("vue-resource");
var App = require('./App.vue');
var VueLazyload = require('vue-lazyload');

Vue.use(VueLazyload, {
    loading: require('./images/loading.png')
});
Vue.use(VueRouter);
Vue.use(vueResource);
Vue.http.options.credentials = true;

Vue.config.debug = true;

var router = new VueRouter({
    routes: [{
        path: "*",
        redirect: "/index"
    }, {
        name: "index",
        path: "/index",
        component: require("./views/index/index.vue")
    }]
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