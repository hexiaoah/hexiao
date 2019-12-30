var Router = require('vue-router')
export var router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/redirect'
    },
    {
      path: '/redirect',
      name: 'redirect',
      meta: {
        title: '特约商户申请'
      },
      component: require('./views/redirect/index.vue')
    },
    {
      path: '/index',
      name: 'index',
      meta: {
        title: '支付宝特约商户'
      },

      component: require('./views/index/index.vue')
    },
    {
      path: '/input',
      name: 'input',
      meta: {
        title: '支付宝特约商户'
      },
      component: require('./views/input/InputInformation.vue')
    },
    {
      path: '/upgrade',
      name: 'upgrade',
      meta: {
        title: '支付宝特约商户'
      },
      component: require('./views/upgradeProcess/index.vue')
    },
    {
      path: '/auth/:step',
      name: 'auths',
      component: require('./components/status-components/auth.vue'),
      children: [
        {
          path: 'auditing',
          meta: {
            title: '支付宝特约商户'
          },
          component: require('./components/status-components/auth-auditing.vue')
        },
        {
          path: 'sign',
          meta: {
            title: '支付宝特约商户'
          },
          component: require('./components/status-components/auth-sign.vue')
        },
        {
          path: 'fail',
          meta: {
            title: '支付宝特约商户'
          },
          component: require('./components/status-components/auth-fail.vue')
        },
        {
          path: 'success',
          meta: {
            title: '支付宝特约商户'
          },
          component: require('./components/status-components/auth-success.vue')
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  let title = to.meta.title
  document.title = title
  //   console.log(to, from, next)
  // 路由变换后，滚动至顶
  window.scrollTo(0, 0)
  next()
})
