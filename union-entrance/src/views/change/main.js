// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import GATEWAY_ENV from '../../config/env.js'
import { Icon, Row, Col, Message } from 'iview'

Vue.component('Icon', Icon)
Vue.component('Row', Row)
Vue.component('Col', Col)
Vue.prototype.$Message = Message
// import Cookie from "@2dfire/utils/cookie";
Vue.config.productionTip = false
// token放在header，网关接口需要令牌
Vue.http.headers.common['env'] = GATEWAY_ENV
// console.log(Vue.http);
// Vue.http.options.xhr = { withCredentials: true };
// Vue.http.headers.common['_k'] = localStorage.getItem("token");

new Vue({
  el: '#app',
  // router,
  template: '<App/>',
  components: { App }
})
