import Vue from 'vue';
import App from './App';
import router from './router';   
import ScrollLoading from './components/scroll-loading.vue';
import toast from './components/toast/index.js'
import confirm from './components/confirm/index.js'
Vue.component('ScrollLoading', ScrollLoading)
Vue.use(toast)
Vue.use(confirm)
Vue.config.productionTip = false;

router.beforeEach((to, from, next) => { 

    // 路由变换后，滚动至顶
    window.scrollTo(0, 0)
    next()
})

new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {App},
});

