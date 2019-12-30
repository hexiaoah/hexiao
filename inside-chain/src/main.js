// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueResource from 'vue-resource';
import Cookie from '@2dfire/utils/cookie'
import App from './App';
import router from './router';
import iView, {Message} from 'iview';
import Vuex from 'vuex'
import 'iview/dist/styles/iview.css'; // 使用 CSS
import store from "./store";

import { ENV } from "apiConfig";

Vue.use(VueResource);
Vue.use(iView);
Vue.use(Vuex);
Vue.prototype.$Message = Message
Vue.config.productionTip = false;

// 环境参数 pre/publish
Vue.http.headers.common['env'] = ENV;
// 国际化需要语言参数
Vue.http.headers.common['lang'] = 'zh_CN';
// token放在header，网关接口需要令牌，登录接口除外
let token = ''
if(Cookie.getItem('entrance') != undefined){
    token = encodeURIComponent(JSON.parse(decodeURIComponent(Cookie.getItem('entrance'))).token)
}
Vue.http.headers.common['token'] = token;

Vue.prototype.$ToFixed = function(num){
    return parseInt(num * 100) / 100
}

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App },
});

router.beforeEach((to, from, next) => {
    // 路由变换后，滚动至顶
    window.scrollTo(0, 0)

    next()
})
