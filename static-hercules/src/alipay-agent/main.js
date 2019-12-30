var Vue = require('vue')
var VueRouter = require('vue-router')
var vueResource = require('vue-resource')
var App = require('./App.vue')
var Scss = require('./scss/index.scss')
var InfoInput = require('./components/info-input.vue')
var InfoPhoto = require('./components/info-photo.vue')
var InfoSelect = require('./components/info-select.vue')
var BaseSwitch = require('./components/base-switch.vue')
var InfoSwitch = require('./components/info-switch.vue')
var DatePickerNew = require('./components/date-picker-new.vue')

import { router } from './router'
import store from './store'
import { Picker, DatetimePicker, Popup } from 'mint-ui'
import Toast from 'base/components/Toast.vue'
import FireUi from '@2dfire/fire-ui'
import '@2dfire/fire-ui/dist/index.css'

Vue.use(VueRouter)
Vue.use(vueResource)
Vue.use(Scss)
Vue.use(FireUi)

Vue.component('Toast', Toast)
Vue.component(Picker.name, Picker)
Vue.component(Popup.name, Popup)
Vue.component(DatetimePicker.name, DatetimePicker)
Vue.component(DatePickerNew.name, DatePickerNew)

Vue.component('info-input', InfoInput)
Vue.component('info-photo', InfoPhoto)
Vue.component('info-select', InfoSelect)
Vue.component('base-switch', BaseSwitch)
Vue.component('info-switch', InfoSwitch)

Vue.http.options.credentials = true

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
