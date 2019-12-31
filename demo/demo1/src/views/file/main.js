import Vue from 'vue';
import App from './App';
// import iView from 'iview';
import router from './router';
import 'iview/dist/styles/iview.css'; // 使用 CSS

// Vue.use(iView);
Vue.config.productionTip = false;
// console.log(Vue.http);
// Vue.http.options.xhr = { withCredentials: true };
// Vue.http.headers.common['_k'] = localStorage.getItem("token");
import {Breadcrumb,BreadcrumbItem,Row ,Modal,Message,Select,Option,Icon} from "iview";
const componentsArr = {
    Breadcrumb,
    BreadcrumbItem,
    Row,
    Modal,
    Message,
    Select,
    Option,
    Icon,  
}
Object.keys(componentsArr).forEach(item => {
    Vue.component(item, componentsArr[item])
})
Vue.prototype.$Message = Message
Vue.prototype.$Modal = Modal;
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App },
});


router.beforeEach((to, from, next) => {
    // 路由变换后，滚动至顶
    window.scrollTo(0, 0)

    next()
})
