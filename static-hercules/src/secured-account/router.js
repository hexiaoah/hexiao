import Vue from 'vue'
import Router from 'vue-router'
import WithdrawDeposit from './views/withdraw-deposit'
import PayAccount from './views/pay-account/index'
import PubAccount from './views/bind-backcard/public/index'
import PerAccount from './views/bind-backcard/person/index'
import bankSub from './views/bank/BankSub'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/pay-account'
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
      path: '/pay-account',
      name: 'payAccount',
      component: PayAccount,
      meta: {
        title: '担保交易收款账户'
      }
    },
    {
      path: '/public-account',
      name: 'pubAccount',
      component: PubAccount,
      meta: {
        title: '绑定对公账户'
      }
    },
    {
      path: '/person-account',
      name: 'perAccount',
      component: PerAccount,
      meta: {
        title: '绑定对私账户'
      }
    },
    {
      path: '/bank-sub',
      name: 'bankSub',
      component: bankSub,
      meta: {
        title: '选择支行'
      }
    }
  ]
})
