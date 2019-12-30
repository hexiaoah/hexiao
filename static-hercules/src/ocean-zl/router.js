var Router = require('vue-router')
export var router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/result'
    },
    {
      path: '/input',
      name: 'input',
      component: require('./views/inputshopinfo/Input.vue')
    },
    {
      path: '/input-tl',
      name: 'input-tl',
      component: require('./views/inputshopinfo/Input-tl.vue')
    },
    {
      path: '/result',
      name: 'result',
      component: require('./views/result/ApplyResult.vue')
    },
    {
      path: '/result-tl',
      name: 'result',
      component: require('./views/result/ApplyResult-tl.vue')
    },
    {
      path: '/inactive-tl',
      name: 'inactive-tl',
      component: require('./views/result/inactive-tl.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  // console.log(to,from,next);
  // 路由变换后，滚动至顶
  window.scrollTo(0, 0)
  next()
})
