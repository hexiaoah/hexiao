//总部传菜路由
import pass from '../../views/pass'
import passScheme from '../../views/pass/scheme'
import passNotIssue from '../../views/pass/notIssue'
import passPrint from '../../views/pass/print'
import passSchemeList from '../../views/pass/scheme/list'
import passSchemeGoodsManage from '../../views/pass/scheme/goodsManage'
// import passsSendManage from '../../views/pass/scheme/sendManage'
export default [
  {
    path: '/pass',
    name: 'pass',
    title: '传菜',
    component: pass,
    redirect: '/pass/scheme',
    children: [
      {
        path: 'scheme',
        name: 'passScheme',
        title: '传菜方案',
        component: passScheme,
        redirect: '/pass/scheme/list',
        children: [
          {
            path: 'list',
            name: 'schemeList',
            title: '传菜方案列表',
            component: passSchemeList
          },
          {
            path: 'goodsManage',
            name: 'passGoodsManage',
            title: '传菜方案商品管理',
            component: passSchemeGoodsManage
          }
          // {
          //   path: 'sendManage',
          //   name: 'sendManage',
          //   title: '传菜下发',
          //   component: passsSendManage
          // }
        ]
      },
      {
        path: 'notIssue',
        name: 'passNotIssue',
        title: '不出单商品',
        component: passNotIssue
      },
      {
        path: 'print',
        name: 'passPrint',
        title: '套餐中商品分类打印设置',
        component: passPrint
      }
    ]
  }
]
