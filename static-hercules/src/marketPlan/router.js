import Vue from 'vue';
import Router from 'vue-router';
import Index from './views/index/index.vue';
import Detail from './views/detail/index.vue';
import Preview from './views/preview/index.vue';
Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '*',
            redirect: '/index'
        }, 
        {
            path: "/index",
            name: "index",
            component: Index
        }, 
        {
            path: "/detail",
            name: "detail",
            component: Detail
        }, 
        {
            path: "/preview",
            name: "preview",
            component: Preview
        },
    ]
})