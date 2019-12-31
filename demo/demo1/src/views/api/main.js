import Vue from 'vue';
import App from './App';
import 'iview/dist/styles/iview.css'; // 使用 CSS

Vue.config.productionTip = false;
// console.log(Vue.http);
// Vue.http.options.xhr = { withCredentials: true };
// Vue.http.headers.common['_k'] = localStorage.getItem("token");
import { Row,Message,Modal,Icon,Breadcrumb,BreadcrumbItem,Select,Option } from "iview";
const componentsArr = {
    Row,
    Message,
    Modal,
    Icon,
    Breadcrumb,
    BreadcrumbItem ,
    Select,
    Option
}
Object.keys(componentsArr).forEach(item => {
    Vue.component(item, componentsArr[item])
})
Vue.prototype.$Message = Message
Vue.prototype.$Modal = Modal;

new Vue({
    el: '#app',
    template: '<App/>',
    components: { App },
});
