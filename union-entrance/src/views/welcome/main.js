// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import { Icon, Row, Col } from 'iview'
// import 'iview/dist/styles/iview.css' // 使用 CSS

// Vue.use('Icon', Icon)
// Vue.use('Row', Row)
// Vue.use('Col', Col)
Vue.config.productionTip = false
// Vue.http.headers.common['env'] = '3c46b0f369e64415a167b5d6af060545';
// console.log(Vue.http);
// Vue.http.options.xhr = { withCredentials: true };
// Vue.http.headers.common['_k'] = localStorage.getItem("token");

new Vue({
  el: '#app',
  // router,
  template: '<App/>',
  components: { App }
})
