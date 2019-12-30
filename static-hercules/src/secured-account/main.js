import Vue from 'vue'
import App from './App'
import router from './router'
import MaskLayer from './components/mask-layer'
import ScrollLoading from './components/scroll-loading'
import ShopPhoto from 'src/secured-account/components/ShopPhoto.vue'
import ShopInput from 'src/secured-account/components/ShopInput'
import ShopSelect from 'src/secured-account/components/ShopSelect'
import store from './store'
import { Picker } from 'mint-ui'
import toast from './components/toast/index.js'
import confirm from './components/confirm/index.js'
import filters from './filters/index'
import './scss/index.scss'

Object.keys(filters).map(key => {
  Vue.filter(key, filters[key]) 
})

Vue.use(toast)
Vue.use(confirm)

Vue.component('info-photo', ShopPhoto)
Vue.component('info-input', ShopInput)
Vue.component('info-select', ShopSelect)
Vue.component('MaskLayer', MaskLayer)
Vue.component('ScrollLoading', ScrollLoading)
Vue.component(Picker.name, Picker)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  document.title = to.meta.title

  // 路由变换后，滚动至顶
  window.scrollTo(0, 0)
  next()
})


new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
