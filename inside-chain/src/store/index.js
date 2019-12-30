import Vue from 'vue';
import Vuex from 'vuex';

import leftNavModules from "./modules/components/left-nav";
import crumbModules from "./modules/components/crumb";

import setting from './modules/setting'

import payKindModules from './modules/payKind'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {},
    modules: {
        leftNav: leftNavModules,
        crumb: crumbModules,

        // setting: setting,
        // payKind: payKindModules,
    }
});

export default store;
