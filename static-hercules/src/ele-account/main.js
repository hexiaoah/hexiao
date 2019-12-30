import Vue from 'vue';
import App from './App';
import router from './router';
import MaskLayer from './components/mask-layer'
import TableView from './components/table-view'
import SubTitle from './components/sub-title'
import ScrollLoading from './components/scroll-loading'
import DatePicker from './components/date-picker/lib/date-picker'
import toast from './components/toast/index.js'
import confirm from './components/confirm/index.js'
import filters from './filters/index'
import ClipBoard from './components/clip-board'

Object.keys(filters).map((key) => {
    Vue.filter(key, filters[key])
})

Vue.use(toast)
Vue.use(confirm)

Vue.component('MaskLayer', MaskLayer)
Vue.component('TableView', TableView)
Vue.component('SubTitle', SubTitle)
Vue.component('ScrollLoading', ScrollLoading)
Vue.component('DatePicker', DatePicker)
Vue.component('ClipBoard', ClipBoard)

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
    document.title = to.meta.title

    // 路由变换后，滚动至顶
    window.scrollTo(0, 0)
    next()
})

new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {App},
});

