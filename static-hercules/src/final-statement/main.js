import Vue from 'vue'
import App from './App'
import router from './router'
import filters from './filters/index'

import FireUi from '@2dfire/fire-ui'
import '@2dfire/fire-ui/dist/index.css'
import SelectTab from './components/select-tab'
import FSelect from './components/select'
import Screen from './components/screen'
// import PriceKeyboard from '@2dfire/PriceKeyboard'
// import '@2dfire/PriceKeyboard/dist/style.css'
Object.keys(filters).map(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

Vue.use(FireUi)
Vue.component('SelectTab', SelectTab)
Vue.component('Screen', Screen)
Vue.component('FSelect', FSelect)

router.beforeEach((to, from, next) => {
  if (from.meta.title != '销售数据审核') {
    document.title = to.meta.title
  }
  // 路由变换后，滚动至顶
  window.scrollTo(0, 0)

  next()
})

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
