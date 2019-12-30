var Vue = require("vue");
var VueRouter = require("vue-router");
var vueResource = require("vue-resource");
var Scss = require('./scss/index.scss');
var App = require('./App.vue');
var InfoInput = require('./components/info-input.vue');
var InfoSelect = require('./components/info-select.vue');

import FireUi from '@2dfire/fire-ui'
import {
	Picker, Popup
} from 'mint-ui'
import '@2dfire/fire-ui/dist/index.css'
import {router} from "./router"
import store from './store'

Vue.use(FireUi)
Vue.use(VueRouter);
Vue.use(vueResource);
Vue.use(Scss);
Vue.component('info-input', InfoInput);
Vue.component('info-select', InfoSelect);
Vue.component(Picker.name, Picker)
Vue.component(Popup.name, Popup)
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
