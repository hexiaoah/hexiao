import { APP_KEY } from 'apiConfig'
// import Requester from 'src/base/requester'
// import {GW} from '@2dfire/gw-params'
import Requester from 'base/interception'
import catchError from '../libs/catchError'
import 'url-search-params-polyfill'

const getBaseUrl = method => () => {
  const appKey = sessionStorage.getItem('appKey')
  if (appKey) {
    /*兼容74版本之前 绑定银行卡->绿洲*/
    return `app_key=${appKey}&method=${method}`
  } else {
    return `app_key=${APP_KEY}&method=${method}`
  }
}
const API = {
  getToken: getBaseUrl(
    'com.dfire.soa.sso.ISessionManagerService.validateServiceTicket'
  ),
  getMapToken: getBaseUrl(
    'com.dfire.boss.center.soa.login.service.ILoginService.getSessionMapFromToken'
  ),
  applyState: getBaseUrl(
    'com.dfire.soa.audit.service.IGreenPlanClientService.getEntityOpenStatus2'
  ),
  getAlipayApplyStatus: getBaseUrl(
    'com.dfire.fin.thirdpart.merchant.service.IPaymentAuthApplyService.getAlipayApplyStatus'
  ),
  applyAliPayState: getBaseUrl(
    'com.dfire.soa.boss.center.pay.service.IAuditBluePlanService.getBlueOpenStatus'
  ),
  getApplyMaterials: getBaseUrl(
    'com.dfire.soa.audit.service.IGreenPlanClientService.getApplyInfo'
  ),
  submitShopInfo: getBaseUrl(
    'com.dfire.soa.audit.service.IGreenPlanClientService.submitApply'
  ),
  getRegion: getBaseUrl(
    'com.dfire.soa.boss.center.base.service.ISystemService.getAreaInfo&need_sub_area=true'
  ),
  activateAccount: getBaseUrl(
    'com.dfire.soa.audit.service.IGreenPlanClientService.activateAccount'
  ),
  judgeSuper: getBaseUrl(
    'com.dfire.boss.center.soa.user.service.IUserClientService.isSuper'
  ),
  judgeChannel: getBaseUrl(
    'com.dfire.soa.audit.service.IGreenPlanClientService.setForcible'
  ),
  emergencyChange: getBaseUrl(
    'com.dfire.soa.audit.service.IGreenPlanClientService.needEmergencyChange'
  ),
  emergencyOpen: getBaseUrl(
    'com.dfire.soa.audit.service.IGreenPlanClientService.emergencyOpen'
  ),
  getWechatApplyStatus: getBaseUrl(
    'com.dfire.fin.thirdpart.merchant.service.IPaymentAuthApplyService.getWechatApplyStatus'
  ),
  getWechatApplyStatusByPeople: getBaseUrl(
    'com.dfire.soa.boss.IAppointedShopService.getAppointedShops'
  ),
  getMerchantAuthApplyByEntityId: getBaseUrl(
    'com.dfire.fin.thirdpart.merchant.service.IMerchantAuthApplyService.getMerchantAuthApplyByEntityId'
  ),
  getMerchantAuthInfoByEntityId: getBaseUrl(
    'com.dfire.pay.center.service.settings.IMerchantAuthService.getMerchantAuthInfoByEntityId'
  )
}

const getHeaders = () => {
  return {
    token: sessionStorage.getItem('token'),
    lang: 'zh_CN'
  }
}

const isToken = false

const isGw = true

export const getToken = params => {
  // return Requester.get(getBaseUrl() + 'com.dfire.soa.sso.ISessionManagerService.validateServiceTicket&', {params: {...params, appKey: APP_KEY}}, false)
  return Requester.get(API.getToken(), {
    isGw,
    isToken,
    headers: getHeaders(),
    handleError: catchError,
    params: {
      ...params,
      appKey: APP_KEY
    }
  }).then(data => ({ data }))
}

// 根据token查询店铺信息
export const getMapToken = () => {
  return Requester.get(API.getMapToken(), {
    isGw,
    isToken,
    headers: getHeaders(),
    handleError: catchError
  }).then(data => ({ data }))
}
/**
 * 查询开通状态
 * @returns applyType: 申请类型 openStatus: 申请状态
 * @constructor
 */
export const applyState = () => {
  const entityId = sessionStorage.getItem('entityId') || ''
  // return Requester.get(getBaseUrl() + 'com.dfire.soa.audit.service.IGreenPlanClientService.getEntityOpenStatus&', {params: {}}, false)
  return Requester.get(API.applyState(), {
    isGw,
    isToken,
    headers: getHeaders(),
    handleError: catchError,
    params: {
      entityId
    }
  }).then(data => ({ data }))
}
/**
 * 查询开通状态
 * @returns applyType: 申请类型 openStatus: 申请状态
 * @constructor
 */
export const applyAliPayState = () => {
  const entityId = sessionStorage.getItem('entityId') || ''

  // return Requester.get(getBaseUrl() + `com.dfire.boss.center.soa.pay.service.IAuditBluePlanService.getEntityOpenStatus&`, {params: {}}, false)
  return Requester.get(API.applyAliPayState(), {
    isGw,
    isToken,
    headers: getHeaders(),
    handleError: catchError,
    params: {
      entityId
    }
  }).then(data => ({ data }))
}
/**
 * 获取微信直连开通状态
 * @returns
 * @constructor
 */
export const getWechatApplyStatus = () => {
  const entityId = sessionStorage.getItem('entityId') || ''
  return Requester.get(API.getWechatApplyStatus(), {
    isGw,
    isToken,
    headers: getHeaders(),
    handleError: catchError,
    params: {
      entityId
    }
  }).then(data => ({ data }))
}
/**
 * 获取店铺各支付方式支付信息
 * @returns
 * @constructor
 */
export const getMerchantAuthInfoByEntityId = () => {
  const entityId = sessionStorage.getItem('entityId') || ''
  return Requester.get(API.getMerchantAuthInfoByEntityId(), {
    isGw,
    isToken,
    headers: getHeaders(),
    handleError: catchError,
    params: {
      entityId
    }
  }).then(data => ({ data }))
}
/**
 * 获取微信直连开通状态 ---后台手动开通的
 * @returns
 * @constructor
 */
export const getWechatApplyStatusByPeople = () => {
  const entityId = sessionStorage.getItem('entityId') || ''
  return Requester.get(API.getWechatApplyStatusByPeople(), {
    isGw,
    isToken,
    headers: getHeaders(),
    handleError: catchError,
    params: {
      entityId: entityId,
      //   entityId: 99934030,
      isBrand: ''
    }
  }).then(data => ({ data }))
}
/**
 *  查询进件资料
 * @returns
 * @constructor
 */
export const getMerchantAuthApplyByEntityId = () => {
  const entityId = sessionStorage.getItem('entityId') || ''
  return Requester.get(API.getMerchantAuthApplyByEntityId(), {
    isGw,
    isToken,
    headers: getHeaders(),
    handleError: catchError,
    params: {
      entityId: entityId
    }
  }).then(data => ({ data }))
}
/**
 * 查询支付宝特约商户开通状态
 * @returns
 * @constructor
 */
export const getAlipayApplyStatus = () => {
  const entityId = sessionStorage.getItem('entityId') || ''
  return Requester.get(API.getAlipayApplyStatus(), {
    isGw,
    isToken,
    headers: getHeaders(),
    handleError: catchError,
    params: {
      entityId
    }
  }).then(data => ({ data }))
}
/**
 * 获取商户信息
 * @param open_type 申请类型(e_payment: 电子收款商户 wechat_payment: 微信特约商户)
 * @returns
 * @constructor
 */
export const getApplyMaterials = open_type => {
  // return Requester.get(getBaseUrl() + 'com.dfire.soa.audit.service.IGreenPlanClientService.getApplyInfo&', {params: {open_type}}, false)
  return Requester.get(API.getApplyMaterials(), {
    isGw,
    isToken,
    headers: getHeaders(),
    handleError: catchError,
    params: {
      open_type
    }
  }).then(data => ({ data }))
}

/**
 * 提交申请资料
 * @param apply_info 申请信息
 * @param open_type 申请类型(e_payment: 电子收款商户 wechat_payment: 微信特约商户)
 * @returns
 * @constructor
 */
export const submitShopInfo = (apply_info, open_type) => {
  // return Requester.post(getBaseUrl() + 'com.dfire.soa.audit.service.IGreenPlanClientService.submitApply&', {
  //     apply_info,
  //     open_type
  // }, {emulateJSON: true}, false)
  let formData = new URLSearchParams()
  formData.append('apply_info', apply_info)
  formData.append('open_type', open_type)

  return Requester.post(API.submitShopInfo(), formData, {
    isGw,
    isToken,
    headers: getHeaders(),
    handleError: catchError
  }).then(data => ({ data }))
}

/**
 * 获取中国行政区
 * @param sub_area_type 行政区域划分（province, city, town, street）
 * @param id 上级行政区域id
 * @returns
 * @constructor
 */
export const getRegion = (sub_area_type, id) => {
  // return Requester.get(getBaseUrl() + 'com.dfire.soa.boss.center.base.service.ISystemService.getAreaInfo&need_sub_area=true&', {
  //     params: {
  //         sub_area_type,
  //         id
  //     }
  // }, false)
  return Requester.get(API.getRegion(), {
    isGw,
    isToken,
    headers: getHeaders(),
    handleError: catchError,
    params: {
      sub_area_type,
      id
    }
  }).then(data => ({ data }))
}

/**
 * 激活电子收款账户
 * @returns {*}
 */
export const activateAccount = () => {
  // return Requester.get(getBaseUrl() + 'com.dfire.soa.audit.service.IGreenPlanClientService.activateAccount&', {params: {}}, false)
  return Requester.get(API.activateAccount(), {
    isGw,
    isToken,
    headers: getHeaders(),
    handleError: catchError
  }).then(data => ({ data }))
}

/**
 * 判断是否是超级管理员
 * @returns {*}
 */
export const judgeSuper = () => {
  // return Requester.get(getBaseUrl() + 'com.dfire.boss.center.soa.user.service.IUserClientService.isSuper&', {params: {}}, false)
  return Requester.get(API.judgeSuper(), {
    isGw,
    isToken,
    headers: getHeaders(),
    handleError: catchError
  }).then(data => ({ data }))
}

/**
 * 标记为强制通道
 * @returns {*}
 */
export const judgeChannel = () => {
  // return Requester.get(getBaseUrl() + 'com.dfire.soa.audit.service.IGreenPlanClientService.setForcible&', {params: {}}, false)
  return Requester.get(API.judgeChannel(), {
    isGw,
    isToken,
    headers: getHeaders(),
    handleError: catchError
  }).then(data => ({ data }))
}

/**
 * 标记为紧急变更
 */
export const emergencyChange = () => {
  // return Requester.get(getBaseUrl() + 'com.dfire.soa.audit.service.IGreenPlanClientService.needEmergencyChange&', {params: {}}, false)
  return Requester.get(API.emergencyChange(), {
    isGw,
    isToken,
    headers: getHeaders(),
    handleError: catchError
  }).then(data => ({ data }))
}

/**
 * 自然人修改
 */
export const naturalChange = () => {
  return Requester.get(API.emergencyOpen(), {
    isGw,
    isToken,
    headers: getHeaders(),
    handleError: catchError
  }).then(data => {
    data
  })
}
