var Router = require("vue-router");
export var router = new Router({
  routes: [{
      path: "*",
      redirect: "/index"
    },
    {
      path: "/index",
      name: "index",
      title: "微信支付特约商户",
      component: require("./views/index/index.vue")
    },
    {
      path: "/input/:step",
      name: "inputs",
      title: "小微商户",
      component: require("./views/xiaowei/Input.vue"),
      children: [{
          path: 'first',
          component: require("./views/xiaowei/InputInformation.vue")
        },
        {
          path: 'second',
          component: require("./views/xiaowei/WeChatAudit.vue")
        },
        {
          path: 'third',
          component: require("./views/xiaowei/ScanCodeSigning.vue")
        },
        {
          path: 'fourth',
          component: require("./views/xiaowei/InfoStartUsing.vue")
        }
      ]
     },
    {
      path: "/merchants/:step",
      name: "upgrademerchants",
      title: "升级普通商户",
      component: require("./views/upgrademerchants/Input.vue"),
      children: [{
          path: 'first',
          component: require("./views/upgrademerchants/InputInfo.vue")
        },
        {
          path: 'second',
          component: require("./views/upgrademerchants/WeChatAudit.vue")
        },
        {
          path: 'third',
          component: require("./views/upgrademerchants/ScanCodeSiging.vue")
        },
        {
          path: 'fourth',
          component: require("./views/upgrademerchants/InfoStartUsing.vue")
        }
      ]
    },
    {
      path: "/merchantinfo",
      name: "merchantinfo",
      title: "商户信息",
      component: require("./views/upgrademerchants/MerchantInfo.vue")
    },
    {
      path: "/merchantupgradeinfo",
      name: "merchantupgradeinfo",
      title: "商户升级信息",
      component: require("./views/upgrademerchants/MerchantUpgradeInfo.vue")
    },
    {
      path: "/editbankcard",
      name: "editbankcard",
      title: "修改收款银行卡",
      component: require("./views/edit/EditBankCard.vue")
    },
    {
      path: "/edituserinfo",
      name: "edituserinfo",
      title: "修改商户信息",
      component: require("./views/edit/EditUserInfo.vue")
    }
  ]
});

router.beforeEach((to, from, next) => {
  // console.log(to,from,next);
  // 路由变换后，滚动至顶
  window.scrollTo(0, 0)
  next()
})