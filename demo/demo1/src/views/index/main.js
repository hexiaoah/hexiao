// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
// import iView from 'iview';
import 'iview/dist/styles/iview.css'; // 使用 CSS

// Vue.use(iView);
Vue.config.productionTip = false;
// console.log(Vue.http);
// Vue.http.options.xhr = { withCredentials: true };
// Vue.http.headers.common['_k'] = localStorage.getItem("token");
import { Carousel,CarouselItem,Message,Modal,Breadcrumb,BreadcrumbItem,Row,Select,Option,Icon } from "iview";
const componentsArr = {
    Carousel,
    CarouselItem,
    Message,
    Modal,
    Breadcrumb,
    BreadcrumbItem,
    Row,
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
    // router,
    template: '<App/>',
    components: { App },
});
