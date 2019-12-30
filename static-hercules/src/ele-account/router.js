import Vue from 'vue';
import Router from 'vue-router';
import Index from './views/index'
import Fee from './views/fee'
import ReceiptInfo from './views/receipt-info'
import BillInfo from './views/bill-info'
import BillDayInfo from './views/bill-day-info'

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
            meta: {
                title: '电子收款账户'
            }
        }, {
            path: "/fee",
            name: "fee",
            component: Fee,
            meta: {
                title: '费率说明'
            }
        }, {
            path: "/receipt-info",
            name: "receipt-info",
            component: ReceiptInfo,
            meta: {
                title: '当日收款明细'
            }
        }, {
            path: "/bill-info",
            name: "bill-info",
            component: BillInfo,
            meta: {
                title: '结算明细'
            }
        }, {
            path: "/bill-day-info/:billDate",
            name: "bill-day-info",
            component: BillDayInfo,
            meta: {
                title: '结算详情'
            }
        }
    ]
})