import Vue from 'vue'
// import vueResource from 'vue-resource'
import App from './App.vue'
import router from './router'
import store from './store'
import { Picker } from 'mint-ui'
import Toast from 'base/components/Toast.vue'
import './scss/index.scss'
// import {ENV} from 'apiConfig'

Vue.component('Toast', Toast)
Vue.component(Picker.name, Picker)

// Vue.use(vueResource);
// // 环境参数 pre/publish
// Vue.http.headers.common['env'] = ENV;
// // 国际化需要语言参数
// Vue.http.headers.common['lang'] = 'zh_CN'

router.beforeEach((to, from, next) => {
  if (to.meta && to.meta.title) {
    document.title = to.meta.title
  }
  // 路由变换后，滚动至顶
  window.scrollTo(0, 0)
  next()
})
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
