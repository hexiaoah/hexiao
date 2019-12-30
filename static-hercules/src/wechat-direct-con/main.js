var Vue = require("vue");
var VueRouter = require("vue-router");
var vueResource = require("vue-resource");
var App = require('./App.vue');
var Scss = require('./scss/index.scss');
var InfoInput = require('./components/info-input.vue');
var InfoPhoto = require('./components/info-photo.vue');
var InfoMultiPhoto = require('./components/info-multi-photo.vue');
var InfoSelect = require('./components/info-select.vue');
var BaseSwitch = require('./components/base-switch.vue');
var InfoSwitch = require('./components/info-switch.vue');
var DatePickerNew = require("./components/date-picker-new.vue");

import {router} from "./router"
import store from './store'
import {Picker, DatetimePicker, Popup} from 'mint-ui'
import Toast from 'base/components/Toast.vue'
import FireUi from '@2dfire/fire-ui'
import '@2dfire/fire-ui/dist/index.css'
import logger from '@2dfire/logger'

Vue.use(VueRouter);
Vue.use(vueResource);
Vue.use(Scss);
Vue.use(FireUi);

Vue.use(logger, {
	product: '2.8', //产品线,进件
	project: 'wx_direct_con', //项目名称
	router: router
});

Vue.component('Toast', Toast)
Vue.component(Picker.name, Picker)
Vue.component(Popup.name, Popup)
Vue.component(DatetimePicker.name, DatetimePicker)
Vue.component(DatePickerNew.name, DatePickerNew)

Vue.component('info-input', InfoInput)
Vue.component('info-photo', InfoPhoto)
Vue.component('info-multi-photo', InfoMultiPhoto)
Vue.component('info-select', InfoSelect)
Vue.component('base-switch', BaseSwitch)
Vue.component('info-switch', InfoSwitch)

Vue.http.options.credentials = true;

new Vue({
	el: '#app',
	router,
	store,
	template: "<App/>",
	components: {
		App
	},
});