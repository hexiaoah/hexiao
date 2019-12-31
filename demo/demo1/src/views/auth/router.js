import Vue from 'vue';
import Router from 'vue-router';

import Login from './login/index';
import Check from './check/index';
import checkList from './login/check-list'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '*',
            redirect: '/login'
        },
        {
            path: '/login',
            name: "login",
            component: Login,
        },
        {
            path: '/check',
            name: "check",
            component: Check,
        },
        {
            path: '/checkList',
            name: "checkList",
            component: checkList,
        }

    ],
});
