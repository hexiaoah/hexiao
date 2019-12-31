import Vue from 'vue';
import Router from 'vue-router';

import Start from './start/index.vue';
import Flow from './flow';
import Data from './data/index';
import Leaguer from './leaguer/index';
import Coupon from './coupon/index';
import Parcel from './parcel/index';
import Dispatching from './dispatching/index';
import Receipt from './receipt/index';
import Message from './message';
import Ent from './ent';
import Api from './api';
import Faq from './faq';
import _i from "@/i18n/index";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '*',
            redirect: '/docs_guide_start'
        },
        {
            path: '/docs_guide',
            name: _i("SIDEBAR.DOCS.GUIDE"),
            redirect: '/docs_guide_start',
            meta: {
                requireRouter: true,
            },
        },
        {
            path: '/docs_dev',
            name: _i("SIDEBAR.DOCS.DEV"),
            redirect: '/docs_dev_ent',
            meta: {
                requireRouter: true,
            },
        },
        {
            path: '/docs_guide_start',
            name: _i("SIDEBAR.DOCS.START"),
            component: Start,
            meta: {
                requireRouter: true,
            },
        },
        {
            path: '/docs_guide_flow',
            name: _i("SIDEBAR.DOCS.FLOW"),
            component: Flow,
            meta: {
                requireRouter: true,
            },
        },
        {
            path: '/docs_dev_message',
            name: _i("SIDEBAR.DOCS.MESSAGE"),
            component: Message,
            meta: {
                requireRouter: true,
            },
        },
        {
            path: '/docs_dev_ent',
            name: _i("SIDEBAR.DOCS.AUTH.ENTERPRISE"),
            component: Ent,
            meta: {
                requireRouter: true,
            },
        },
        {
            path:'/docs_scheme',
            name: _i('SIDEBAR.DOCS.SCHEME'),
            redirect:'/docs_scheme_data',
            meta: {
                requireRouter: true,
            },
        },
        {
            path:'/docs_scheme_data',
            name: _i('SIDEBAR.DOCS.DATA'),
            component:Data,
            meta: {
                requireRouter: true,
            },
        },
        {
            path:'/docs_scheme_leaguer',
            name:_i('SIDEBAR.DOCS.LEAGUER'),
            component:Leaguer,
            meta: {
                requireRouter: true,
            },
        },
        {
            path:'/docs_scheme_coupon',
            name:_i('SIDEBAR.DOCS.COUPON'),
            component:Coupon,
            meta: {
                requireRouter: true,
            },
        },
        {
            path:'/docs_scheme_parcel',
            name: _i('SIDEBAR.DOCS.PARCEL'),
            component:Parcel,
            meta: {
                requireRouter: true,
            },
        },
        {
            path:'/docs_scheme_dispatching',
            name: _i('SIDEBAR.DOCS.DISPATCHING'),
            component:Dispatching,
            meta: {
                requireRouter: true,
            },
        },
        {
            path:'/docs_scheme_receipt',
            name: _i('SIDEBAR.DOCS.RECEIPT'),
            component:Receipt,
            meta: {
                requireRouter: true,
            },
        },
        {
            path: '/docs_api',
            name: _i("SIDEBAR.DOCS.API"),
            component: Api,
            meta: {
                requireRouter: true,
            },
        },
        {
            path: '/docs_faq',
            name: _i("SIDEBAR.DOCS.FAQ"),
            component: Faq,
            meta: {
                requireRouter: true,
            },
        }
    ],
});
