import util from '../util'
const env = util.getEnv()
const { userInfo, loginType, shopInfo, token } = util.getCookie('entrance')
const { userId, memberId } = userInfo || {}
const { entityId } = shopInfo || {}
const { loginEntityId } = shopInfo || {}
//仅数据中心要添加的参数
// const params = `?X-Token=${encodeURI(
//   token
// )}&type=${loginType}&userId=${userId}&memberId=${memberId}&entityId=${entityId}`
const params = `?X-Token=${encodeURI(
  token
)}&type=${loginType}&userId=${userId}&memberId=${memberId}&entityId=${loginEntityId ||
  entityId}`
//这个只针对项目环境
const pathname = util.getPathKey()
console.log(pathname)

export default [
  // @联系人：猫尾
  {
    id: '9',
    name: '首页',
    tag: 'homePage',
    // hidden: env === 'publish',
    url: {
      local: 'http://localhost:1234/page/pcHomePage.html#/pcHomePage',
      dev: `http://tt.2dfire.net/${pathname}/shoppingmall-setting/page/pcHomePage.html#/pcHomePage`,
      daily:
        'https://d.2dfire-daily.com/shoppingmall-setting/page/pcHomePage.html',
      pre:
        'https://biz.2dfire-pre.com/shoppingmall-setting/page/pcHomePage.html',
      publish:
        'https://biz.2dfire.com/shoppingmall-setting/page/pcHomePage.html'
    }[env]
  },
  // @联系人：zeqi
  {
    id: '1',
    name: '连锁管理',
    tag: 'chain',
    url: {
      local: 'http://localhost:3003/page/index.html',
      daily: 'http://d.2dfire-daily.com/chain/page/index.html',
      pre: 'https://biz.2dfire-pre.com/chain/',
      publish: 'https://biz.2dfire.com/chain/'
    }[env]
  },
  // @联系人：无
  {
    id: '2',
    name: '数据中心',
    tag: 'data',
    url: {
      local: '',
      dev: `http://tt.2dfire.net/${pathname}/data/data-portal/report-redirect.html${params}`,
      daily: `http://data.2dfire-daily.com/report-redirect.html${params}`,
      pre: `https://data.2dfire-pre.com/report-redirect.html${params}`,
      publish: `https://data.2dfire.com/report-redirect.html${params}`
    }[env],
    target: '__blank'
    //二级菜单
    // children: [
    //     {
    //         id: '6',
    //         name: 'aaaa',
    //         url: 'http://localhost:3003/page/index.html'
    //     },
    //     {
    //         id: '7',
    //         name: 'bbbb',
    //         url: 'http://localhost:3003/page/index.html'
    //     }
    // ]
  },
  // @联系人：刀伤木
  {
    id: '4',
    name: '掌柜工具',
    tag: 'boss',
    url: {
      local: 'http://localhost:3001/',
      dev: `http://tt.2dfire.net/${pathname}/insideboss/`,
      daily: 'http://d.2dfire-daily.com/insideboss',
      pre: 'http://biz.2dfire-pre.com/boss/',
      publish: 'https://biz.2dfire.com/boss/'
    }[env]
  },
  // @联系人：刀伤木
  {
    id: '3',
    name: '供应链',
    tag: 'supply',
    url: {
      local: 'http://localhost:3002/',
      dev: `http://tt.2dfire.net/${pathname}/supplychain/`,
      daily: 'http://d.2dfire-daily.com/static-insidesc',
      pre: 'http://biz.2dfire-pre.com/supplychain/',
      publish: 'https://biz.2dfire.com/supplychain/'
    }[env]
  },
  // @联系人：泽漆
  {
    id: '5',
    name: '高铁',
    tag: 'highSpeed',
    url: {
      local: 'http://localhost:3001/',
      dev: `http://tt.2dfire.net/${pathname}/insideboss/`,
      daily: 'http://d.2dfire-daily.com/insideboss',
      pre: 'http://biz.2dfire-pre.com/boss/',
      publish: 'https://biz.2dfire.com/boss/'
    }[env]
  },
  // @联系人：桑白皮
  {
    id: '6',
    name: '商管ERP',
    tag: 'shoppingMall',
    // hidden: env === 'publish',
    url: {
      local: 'http://localhost:1314/page/index.html',
      dev: `http://tt.2dfire.net/${pathname}/shoppingmall/page/index.html`,
      daily: 'http://d.2dfire-daily.com/shoppingmall/page/index.html',
      pre: 'http://biz.2dfire-pre.com/shoppingmall/',
      publish: 'https://biz.2dfire.com/shoppingmall/'
    }[env]
  },
  // @联系人：猫尾
  {
    id: '7',
    name: 'CRM会员营销',
    tag: 'shoppingMallCrm',
    // hidden: env === 'publish',
    url: {
      local: 'http://localhost:3000/page/index.html#/Welcome',
      dev: `http://tt.2dfire.net/${pathname}/shoppingmall-crm/page/index.html#/Welcome`,
      daily:
        'http://d.2dfire-daily.com/shoppingmall-crm/page/index.html#/Welcome',
      pre:
        'https://biz.2dfire-pre.com/shoppingmall-crm/page/index.html#/Welcome',
      publish:
        'https://biz.2dfire.com/shoppingmall-crm/page/index.html#/Welcome'
    }[env]
  },
  // @联系人：番石榴
  {
    id: '8',
    name: '系统设置',
    tag: 'systemSetting',
    // hidden: env === 'publish',
    url: {
      local: 'http://localhost:1234/page/index.html',
      dev: `http://tt.2dfire.net/${pathname}/shoppingmall-setting/page/index.html`,
      daily: 'https://d.2dfire-daily.com/shoppingmall-setting/page/index.html',
      pre: 'https://biz.2dfire-pre.com/shoppingmall-setting/',
      publish: 'https://biz.2dfire.com/shoppingmall-setting/'
    }[env]
  }
]
