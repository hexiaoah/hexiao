import Vue from 'vue';
import Router from 'vue-router';
import SaleIndex from './views/sale-index'
import SaleList from './views/sale-list'
import SaleEdit from './views/sale-edit'
import SaleInfo from './views/sale-info'
import SaleAdd from './views/sale-add'
import SaleAuditCon from './views/sale-audit-con'
import SaleAuditDay from './views/sale-audit-day'
import SaleAuditShop from './views/sale-audit-shop'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '*',
            redirect: '/sale-index'
        },{
            path: "/sale-index",
            name: "sale-index",
            component: SaleIndex,
            meta: {
                title: '销售数据'
            }
        }, {
            path: "/sale-list",
            name: "sale-list",
            component: SaleList,
            meta: {
                title: '销售数据上报'
            }
        }, {
            path: "/sale-edit",
            name: "sale-edit",
            component: SaleEdit,
            meta: {
                title: '编辑销售数据'
            }
        }, {
            path: "/sale-info",
            name: "sale-info",
            component: SaleInfo,
            meta: {
                title: '查看销售数据'
            }
        }, {
            path: "/sale-add",
            name: "sale-add",
            component: SaleAdd,
            meta: {
                title: '录入销售数据'
            }
        }, {
            path: "/sale-audit",
            name: "sale-audit",
            component: SaleAuditCon,
            children: [
                {
                    path: 'day',
                    name: "sale-audit-day",
                    component: SaleAuditDay,
                    meta: {
                        title: '销售数据审核'
                    }
                },
                {
                    path: 'shop',
                    name: "sale-audit-shop",
                    component: SaleAuditShop,
                    meta: {
                        title: '销售数据审核'
                    }
                }
            ]
        }
    ]
})