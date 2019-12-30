var Router = require("vue-router");
export var router = new Router({
  routes: [{
    path: "*",
    redirect: "/index"
  }, {
    path: "/index",
    name: "index",
    title: "签到领激活码",
    component: require("./views/index.vue")
  }, {
    path: "/details",
    name: "details",
    title: "活动详情",
    component: require("./views/details.vue")
  }, {
    path: "/signin",
    name: "signin",
    title: "签到",
    component: require("./views/signin.vue")
  }, {
    path: "/successful",
    name: "successful",
    title: "升级成功",
    component: require("./views/successful.vue")
  }]
});

router.beforeEach((to, from, next) => {
  // console.log(to,from,next);
  // 路由变换后，滚动至顶
  window.scrollTo(0, 0)
  next()
})
