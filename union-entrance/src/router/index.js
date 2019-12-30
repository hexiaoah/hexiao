import Vue from 'vue';
import Router from 'vue-router';

import LoginEntrance from '@/views/login';
import LoginPwd from '@/views/login/password';
import LoginUser from '@/views/login/user';
import Login from '@/views/login/login';

import MainEntrance from '@/views/main';

import Index from '@/views/main/index/index.vue';

import Qrcode from '@/views/main/qrcode';

import Reimburse from '@/views/main/reimburse';
import ReimburseDetail from '@/views/main/reimburse/reimburse_detail';
import ReimburseWholeDetail from '@/views/main/reimburse/reimburse_whole_detail';
import ReimburseWholeInvoice from '@/views/main/reimburse/reimburse_whole_invoice';

import Employee from '@/views/main/employee';
import ImportBatch from '@/views/main/employee/importBatch';
import ImportLog from '@/views/main/employee/importLog';

import Meal from '@/views/main/meal';

import Invoice from '@/views/main/invoice';
import InvoiceDetail from '@/views/main/invoice/invoice_detail';
import InvoiceWholeDetail from '@/views/main/invoice/invoice_whole_detail';

Vue.use(Router);

export default new Router({
    routes: [{
        path: '*',
        redirect: '/main/index'
    }, {
        path: '/main',
        name: 'main',
        component: MainEntrance,
        redirect: '/main/index',
        children: [{
            path: 'index',
            name: "主页",
            component: Index
        }, {
            path: 'password',
            component: LoginPwd,
        }, {
            path: 'user',
            component: LoginUser,
        }, {
            path: 'qrcode',
            name: "企业码",
            component: Qrcode
        }, {
            path: 'reimburse',
            name: "报销管理",
            component: Reimburse
        }, {
            path: 'reimburse_detail',
            name: "报销单详情",
            component: ReimburseDetail
        }, {
            path: 'reimburse_whole_detail',
            name: "报销单批量审核",
            component: ReimburseWholeDetail
        }, {
            path: 'reimburse_whole_invoice',
            name: "申请开整单发票",
            component: ReimburseWholeInvoice
        }, {
            path: 'meal',
            name: "餐补管理",
            component: Meal
        }, {
            path: 'employee',
            name: "员工管理",
            component: Employee
        }, {
            path: 'invoice',
            name: "发票管理",
            component: Invoice
        }, {
            path: 'invoice_detail',
            name: "开票申请详情",
            component: InvoiceDetail
        }, {
            path: 'invoice_whole_detail',
            name: "开票申请详情",
            component: InvoiceWholeDetail
        }, {
            path: 'employee_importBatch',
            name: "员工批量导入",
            component: ImportBatch
        }, {
            path: 'employee_importLog',
            name: "批量导入历史记录",
            component: ImportLog
        }]
    }, {
        path: '/login',
        name: 'Login',
        component: LoginEntrance,
        redirect: '/login/index',
        children: [{
            path: 'index',
            component: Login,
        }]
    }, ],
});
