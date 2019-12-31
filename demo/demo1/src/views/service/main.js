import Vue from 'vue';
import App from './App';
// import iView from 'iview';
import router from './router';
import 'iview/dist/styles/iview.css'; // 使用 CSS
import ZkTable from 'vue-table-with-tree-grid'
import Cookie from "@2dfire/utils/cookie";

Vue.use(ZkTable)
// Vue.use(iView);
Vue.config.productionTip = false;
// console.log(Vue.http);
// Vue.http.options.xhr = { withCredentials: true };
// Vue.http.headers.common['_k'] = localStorage.getItem("token");
import { Input,Button,Message,Modal,Page,Tree,Select,Option,Col,DatePicker,Checkbox,CheckboxGroup,Collapse,Panel,Form,FormItem, Icon,Breadcrumb,BreadcrumbItem,Row,RadioGroup,Radio,Spin} from "iview";
const componentsArr = {
    Input,
    Button,
    Message,
    Modal,
    Page,
    Tree,
    Select,
    Option,
    Col,
    DatePicker,
    Checkbox,
    CheckboxGroup,
    Collapse,
    Panel,
    Form,
    FormItem,
    Icon,
    Breadcrumb,
    BreadcrumbItem,
    Row,
    RadioGroup,
    Radio,
    Spin
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
    let role = Cookie.getItem('authJoinType');
    // 开发者
    if( role == "DEV") {
        if(to.meta.role == "shop"||to.meta.role =="chain") {
            // console.log("你没有权限访问该路径！！！")
            window.location.hash = from.path
            return
        } else {
            next()
        }
    //    商家
    } else if( role == "SHOP") {
        console.log(from, to);
        if(to.meta.role == "dev"||to.meta.role =="chain") {
            // console.log("你没有权限访问该路径！！！")
            window.location.hash = from.path
            return
        } else {
            next()
        }
    }
    // 连锁
    else if(role=="CHAIN"){
            if(to.meta.role == "dev" ||to.meta.kind == "shop") {
            // console.log("你没有权限访问该路径！！！")
            window.location.hash = from.path
            return
        } else {
            next()
        }
    }
    else{
        next()
    }
    // 路由变换后，滚动至顶
    window.scrollTo(0, 0)

})

