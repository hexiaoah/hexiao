import Vue from 'vue';
import Router from 'vue-router';

import Developer from './developer';
import Right from './right';
import Merchant from './merchant';
import Log from './log';
import McLog from './mclog';
import Index from './index';
import Verify from './verify';
import Feedback from './feedback';
import Pwd from './pwd';
import APPS from './app/index.vue';
import CreateApp from './app/create/index.vue';
import AppDetail from './app/detail/index.vue';
import AppAuth from './app/auth/index.vue';
import AuthDetail from './app/auth/detail/index.vue';
import AuthBind from './app/auth/bind/index.vue';
import DETAILS from './verify/details';
import INFORMATION from './verify/information';
import DevDetails from './developer/details';
import DIRECT from './direct';
import _i from "@/i18n/index";
Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '*',
            redirect: '/server_app'
        },
        {
            path: '/server_index',
            name: _i("SIDEBAR.SERVICE.DEVELOPER"),
            component: Index,
            meta: { role: "shop"},
        },
        {
            path: '/server_app',
            name: _i("SIDEBAR.SERVICE.APP"),
            component: APPS,
            meta: { role: "dev,shop"},
        },
        {
            path: '/server_app_detail',
            name: _i("SERVER.APPS.DETAIL.TABS.DETAIL"),
            component: AppDetail,
            meta: { role: "dev,shop"},
        },
        {
            path: '/server_app_create',
            name: _i("SERVER.APPS.CREATE"),
            component: CreateApp,
            meta: { role: "dev,shop"},
        },
        {
            path: '/server_app_auth',
            name: _i('SERVER.APPS.TABLE.AUTH'),
            component: AppAuth,
            meta: { role: "dev,shop"},
        },
        {
            path: '/server_app_auth_detail',
            name: _i("SIDEBAR.SERVICE.MERCHANT"),
            component: AuthDetail,
            meta: { role: "dev,shop"},
        },
        {
            path: '/server_app_auth_bind',
            name: _i("SERVER.APPS.BIND.LIST.BINDBTN"),
            component: AuthBind,
            meta: { role: "dev,shop"},
        },
        {
            path: '/server_developer',
            name: _i("SIDEBAR.SERVICE.DEVELOPER"),
            component: Developer,
            meta: { role: "shop",kind:"shop"},

        },
        {
            path: '/server_developer_details',
            name: _i("SIDEBAR.SERVICE.MERCHANT"),
            component: DevDetails,
            meta: { role: "shop"},
        },
        {
            path: '/server_right',
            name: _i("SIDEBAR.SERVICE.RIGHT"),
            component: Right,
        },
        {
            path: '/server_merchant',
            name: _i("SIDEBAR.SERVICE.MERCHANT"),
            component: Merchant,
            meta: { role: "shop"},
        },
          {
            path: '/server_direct',
            name: _i("SIDEBAR.SERVICE.DIRECT"),
            component: DIRECT,
            meta: { role: "chain"},
          },
        {
            path: '/server_log',
            name: _i("SIDEBAR.SERVICE.LOG"),
            component: Log,
            meta: { role: "dev"},

        },
        {
            path: '/server_mclog',
            name: _i("SIDEBAR.SERVICE.LOG"),
            component: McLog,
            meta: { role: "shop"},

        },
        {
            path: '/server_pwd',
            name: _i("SIDEBAR.SERVICE.PWD"),
            component: Pwd,
            meta: { role: "dev"},

        },
        {
            path: '/server_verify',
            name: _i("SIDEBAR.SERVICE.VERIFY"),
            component: Verify,
            meta: { role: "dev"},
        },
        {
            path: '/server_feedback',
            name: _i("SIDEBAR.SERVICE.FEEDBACK"),
            component: Feedback,
        },
         {
            path: '/server_verify_information',
            name: _i("VERIFY.TITLE"),
            component: INFORMATION,
             meta: { role: "dev"},
         },
            {
            path: '/server_verify_details',
            name: _i("VERIFY.APP.CONTENT.BTN.DETAILS"),
            component: DETAILS,
            meta: { role: "dev"},

            },
    ],
});
