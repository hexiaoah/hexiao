import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/index'
import Record from './views/record'
import RecordDetail from './views/record-detail'
import AccountBook from './views/account-book'
import AccountSelect from './views/account-select'
import WithdrawDeposit from './views/withdraw-deposit'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      meta: {
        title: '资金管理'
      }
    },
    {
      path: '/record',
      name: 'record',
      component: Record,
      meta: {
        title: '提现操作记录'
      }
    },
    {
      path: '/record-detail',
      name: 'recordDetail',
      component: RecordDetail,
      meta: {
        title: '提现操作详情'
      }
    },
    
    {
      path: '/account-book',
      name: 'accountBook',
      component: AccountBook,
      meta: {
        title: '门店账户余额'
      }
    },
    {
      path: '/account-select',
      name: 'accountSelect',
      component: AccountSelect,
      meta: {
        title: '发起提现'
      }
    },
    {
      path: '/withdraw-deposit',
      name: 'withdrawDeposit',
      component: WithdrawDeposit,
      meta: {
        title: '提现'
      }
    },
  ]
})
