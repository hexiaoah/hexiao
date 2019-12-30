// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import GATEWAY_ENV from '../../config/env.js'
import VueQriously from 'vue-qriously'
// import Cookie from '@2dfire/utils/cookie'
import { Button, Message } from 'iview'

Vue.component('Button', Button)
Vue.prototype.$Message = Message
Vue.config.productionTip = false
Vue.http.headers.common['env'] = GATEWAY_ENV

Vue.use(VueQriously)
// console.log(Vue.http);
// Vue.http.options.xhr = { withCredentials: true };
// Vue.http.headers.common['_k'] = localStorage.getItem("token");
// const entrance = Cookie.getItem('entrance')
// if (entrance) {
//   const { loginType, userInfo, token, shopInfo } = JSON.parse(entrance)
//   if (loginType && userInfo && token) {
//     location.href = shopInfo ? 'welcome.html' : 'change.html'
//   }
// }
new Vue({
  el: '#app',
  // router,
  template: '<App/>',
  components: { App }
})
