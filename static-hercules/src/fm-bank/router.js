import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/index'
import Record from './views/record'
import Accredit from './views/accredit'
import Explain from './views/explain'
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
        title: '商户钱包'
      }
    },
    {
      path: '/accredit',
      name: 'accredit',
      component: Accredit,
      meta: {
        title: '资金管理授权'
      }
    },
    {
      path: '/record',
      name: 'record',
      component: Record,
      meta: {
        title: '提现记录'
      }
    },
    {
      path: '/account-book',
      name: 'accountBook',
      component: AccountBook,
      meta: {
        title: '收支明细'
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
    {
      path: '/explain',
      name: 'explain',
      component: Explain,
      meta: {
        title: '冻结余额'
      }
    }
  ]
})
