//门店传菜路由
import storePassRoot from '../../views/shop/store-manage/pass'
import scheme from '../../views/shop/store-manage/pass/scheme'
import schemeList from '../../views/shop/store-manage/pass/scheme/list/index'
import schemeGoodsManage from '../../views/shop/store-manage/pass/scheme/goodsManage'
import areaPrint from '../../views/shop/store-manage/pass/areaPrint'
import notIssue from '../../views/shop/store-manage/pass/notIssue'
import printer from '../../views/shop/store-manage/pass/printer'
import printSetting from '../../views/shop/store-manage/pass/printSetting'
import schemeCheck from '../../views/shop/store-manage/pass/schemeCheck'
export default [
  {
    path: '/store_pass',
    name: 'storePass',
    title: '门店传菜',
    component: storePassRoot,
    redirect: '/store_pass/scheme',
    children: [
      {
        path: 'scheme',
        name: 'storePassScheme',
        title: '门店传菜方案',
        component: scheme,
        redirect: '/store_pass/scheme/list',
        children: [
          {
            path: 'list',
            name: 'storePassList',
            title: '门店传菜方案列表',
            component: schemeList
          },
          {
            path: 'goodsManage',
            name: 'shopGoodsManage',
            title: '门店传菜方案商品管理',
            component: schemeGoodsManage
          }
        ]
      },
      {
        path: 'printer',
        name: 'printer',
        title: '门店传菜备用打印机',
        component: printer
      },
      {
        path: 'notIssue',
        name: 'notIssue',
        title: '门店传菜不出单商品',
        component: notIssue
      },
      {
        path: 'areaPrint',
        name: 'areaPrint',
        title: '门店传菜区域打印',
        component: areaPrint
      },
      {
        path: 'printSetting',
        name: 'printSetting',
        title: '门店传菜打印设置',
        component: printSetting
      },
      {
        path: 'schemeCheck',
        name: 'schemeCheck',
        title: '门店传菜检查',
        component: schemeCheck
      }
    ]
  }
]
