var Router = require("vue-router");
export var router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/result'
    },
    {
      path: '/bankSub',
      name: 'bankSub',
      component: require("./views/bank/BankSub.vue"),
    },
    {
      path: '/input/:step',
      name: 'inputs',
      component: require("./views/inputshopinfo/Input.vue"),
      children: [
        {
          path: 'first',
          component: require("./views/inputshopinfo/InputStep1.vue")
        },
        {
          path: 'second',
          component: require("./views/inputshopinfo/InputStep2.vue")
        },
        {
          path: 'third',
          component: require("./views/inputshopinfo/InputStep3.vue")
        },
        {
          path: 'fourth',
          component: require("./views/inputshopinfo/InputStep4.vue")
        }
      ]
    },
    {
      path: '/result',
      name: 'result',
      component: require("./views/result/ApplyResult.vue")
    },
    {
      path: '/rule',
      name: 'rule',
      component: require("./views/rule/Rule.vue")
    }
  ]
});

router.beforeEach((to, from, next) => {
  // console.log(to,from,next);
  // 路由变换后，滚动至顶
  window.scrollTo(0, 0)
  next()
})