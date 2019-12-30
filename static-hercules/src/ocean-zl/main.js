import Vue from 'vue'
import Router from 'vue-router'
import App from './App'
import toast from './components/toast/index.js'
import ShopPhoto from 'src/ocean-zl/components/ShopPhoto.vue'
import ShopInput from 'src/ocean-zl/components/ShopInput'
import ShopSelect from 'src/ocean-zl/components/ShopSelect'
import { router } from './router'
import store from './store'
import { Picker } from 'mint-ui'
import './scss/index.scss'

Vue.use(toast)
Vue.component(Picker.name, Picker)
Vue.component('shop-photo', ShopPhoto)
Vue.component('shop-input', ShopInput)
Vue.component('shop-select', ShopSelect)
Vue.use(Router)

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
