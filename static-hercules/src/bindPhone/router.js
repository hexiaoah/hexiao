import Vue from 'vue';
import Router from 'vue-router';
import index from './views/index';
import ScanPage from './views/scan-page';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '*',
            redirect: '/index'
        },
        {
            path: '/index',
            name: 'index',
            component: index,
            meta: {
                title: '扫码登录'
            }
        },
        {
            path: '/scan-page',
            name: 'scan-page',
            component: ScanPage,
            meta: {
                title: '扫码页面'
            }
        }
    ]
});
