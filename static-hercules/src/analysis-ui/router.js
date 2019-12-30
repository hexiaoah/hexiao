import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/index'
import AnalysisTest from './views/analysis-test'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '*',
            redirect: '/index'
        }, {
            path: "/index",
            name: "index",
            component: Index,
            meta:{
                pageName:"首页"
            }
        }, {
            path: "/analysis-test",
            name: "analysis-test",
            component: AnalysisTest,
            meta:{
                pageName:"测试页面"
            }
        }
    ]
})