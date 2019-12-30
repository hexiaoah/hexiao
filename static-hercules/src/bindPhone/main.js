import Toast from './components/toast';
import Vue from 'vue';
import router from './router';
import Router from 'vue-router';
import vueResource from 'vue-resource';
import App from './App.vue';

/**
 *二维码生成工具
 */
import VueQriously from 'vue-qriously';

Vue.use(Toast);
Vue.use(VueQriously);
Vue.use(Router);
Vue.use(vueResource);
Vue.http.interceptors.push((request, next) => {
    request.credentials = false;
    request.emulateHTTP = true;
    request.noCookie = true;
    next();
});

router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    // 路由变换后，滚动至顶
    window.scrollTo(0, 0);
    next();
});

if (window.tdfire == null) {
    window.tdfire = {};
}

window.tdfire.back = function(_this) {
    let timer = setTimeout(function() {
        if (tdfire.pop) {
            tdfire.pop();
        }
    }, 200);
    _this.$router.afterEach(route => {
        clearTimeout(timer);
    });
    _this.$router.back();
};

window.createAndroidBridge = function() {
    if (window.bridge == null) {
        window.bridge = {}; // 创建 bridge 对象
    }
    if (window.tdfire.observe === undefined) {
        window.tdfire.observe = function(callback) {
            window.bridge.invoke(
                window.tdfire.getObservePluginSignature(),
                '',
                callback
            );
        };
    }
    if (window.tdfire.umeng === undefined) {
        window.tdfire.umeng = {
            mobclick: function(event) {
                window.bridge.invoke(
                    window.tdfire.getUmengPluginSignature(),
                    'mobclick',
                    null,
                    event
                );
            }
        };
    }

    window.bridge.callback = {
        index: 0,
        cache: {},
        invoke: function(id, args) {
            let key = '' + id;
            let callbackFunc = window.bridge.callback.cache[key];
            callbackFunc(args);
        }
    };

    window.bridge.invoke = function(pluginName, funcName, callback, ...args) {
        let index = -1;
        // 存储 callback
        if (callback !== null && callback !== undefined) {
            window.bridge.callback.index += 1;
            index = window.bridge.callback.index;
            window.bridge.callback.cache['' + index] = callback;
        }
        // 发送消息到 native 去
        window.bridge.postMessage(
            JSON.stringify({
                identifier: pluginName,
                selector: funcName,
                callbackId: index,
                args: args
            })
        );
    };
};
if (navigator.userAgent.indexOf('tdfire-Android') > -1) {
    window.createAndroidBridge();
}

new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {
        App
    }
});
