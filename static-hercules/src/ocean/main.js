import Vue from 'vue'
import Router from 'vue-router'
import App from './App'
import ShopPhoto from 'src/ocean/components/ShopPhoto.vue'
import ShopInput from 'src/ocean/components/ShopInput'
import ShopSelect from 'src/ocean/components/ShopSelect'
import {router} from "./router"
import store from './store'
import {Picker} from 'mint-ui'
import Toast from 'base/components/Toast.vue'
// import Route from "@2dfire/utils/router";
// import {ENV} from 'apiConfig'
import './scss/index.scss'

// var vueResource = require("vue-resource")

Vue.component('Toast', Toast)
Vue.component(Picker.name, Picker)

Vue.component('shop-photo', ShopPhoto)
Vue.component('shop-input', ShopInput)
Vue.component('shop-select', ShopSelect)

Vue.use(Router)
// Vue.use(vueResource)
// Vue.http.headers.common['token'] = sessionStorage.getItem("token")
// Vue.http.headers.common['env'] = ENV

// 国际化需要语言参数
// Vue.http.headers.common['lang'] = 'zh_CN'

new Vue({
    el: '#app',
    router,
    store,
    template: "<App/>",
    components: {
        App
    },
})