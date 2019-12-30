var Router = require("vue-router");
export var router = new Router({
    routes: [{
      path: "*",
      redirect: "/staffmanage"
    }, 
    {
      path: "/staffmanage",
      name: "staffmanage",
      title: "员工管理",
      component: require("./views/staff/StaffManage.vue")
    },
    {
      path: "/permissions",
      name: "permissions",
      title: "权限设置",
      component: require("./views/permissions/permission.vue")
    },
    {
      path: "/rank/rankmanagelist",
      name: "rankmanagelist",
      title: "职级管理",
      component: require("./views/rank/RankManageList.vue")
    },
    {
      path: "/rank/rankmanagedetail",
      name: "rankmanagedetail",
      title: "职级管理",
      component: require("./views/rank/RankManageDetail.vue")
    },
    {
      path: "/help",
      name: "help",
      title: "帮助",
      component: require("./views/help/help.vue")
    },
    {
      path: "/addstaff",
      name: "addstaff",
      title: "添加员工",
      component: require("./views/staff/AddStaff.vue")
    },
    {
      path: "/staffinfo",
      name: "staffinfo",
      title: "员工",
      component: require("./views/staff/StaffInfo.vue")
    }]
  });

router.beforeEach((to, from, next) => {
  // console.log(to,from,next);
  // 路由变换后，滚动至顶
  window.scrollTo(0, 0)
  next()
})
