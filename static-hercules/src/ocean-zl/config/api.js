import axios from './interception.js'

/**
 * 查询审核结果-直连
 * @returns
 * @constructor
 */
export const getApplyStatus = params =>
  axios({
    method: 'GET',
    url:
      'com.dfire.fin.thirdpart.merchant.service.IPaymentAuthApplyService.queryAlipayBlueSea',
    params: params
  })
/**
 * 提交支付宝直连蓝海审核资料
 * @returns
 * @constructor
 */
export const saveAlipayBlueSea = data =>
  axios({
    method: 'POST',
    url:
      'com.dfire.fin.thirdpart.merchant.service.IPaymentAuthApplyService.saveAlipayBlueSea',
    data
  })

/**
 * 查询通联进件审核结果
 * @returns
 * AUTH_SUCCESS 到蓝海申请页
 * AUTH_FAIL   到激活失败页
 * AUDITING  激活中
 * NO_AUTH  未进件
 * @constructor
 */
export const checkIfAuthByBizType = params =>
  axios({
    method: 'GET',
    url:
      'com.dfire.fin.thirdpart.merchant.service.IMerchantAccountService.checkIfAuthByBizType',
    params
  })

/**
 * 提交通联蓝海审核资料
 * @returns
 * @constructor
 */
export const saveAllinBlueSea = data =>
  axios({
    method: 'POST',
    url:
      'com.dfire.fin.thirdpart.merchant.service.IPaymentAuthApplyService.saveAllinBlueSea',
    data
  })

/**
 * 获取中国行政区
 * @param sub_area_type 行政区域划分（province, city, town, street）
 * @param id 上级行政区域id
 */
export const getRegion = (sub_area_type, id) =>
  axios({
    method: 'GET',
    url: 'com.dfire.soa.boss.center.base.service.ISystemService.getAreaInfo',
    params: {
      sub_area_type,
      id,
      need_sub_area: true
    }
  })

/**
 * 根据entityId和BizType查询审核信息
 * @returns
 * @constructor
 */
export const queryAlipayBlueSea = data =>
  axios({
    method: 'POST',
    url:
      'com.dfire.fin.thirdpart.merchant.service.IPaymentAuthApplyService.queryAlipayBlueSea',
    data
  })

/**
 * 判断是否是超级管理员
 * @returns
 * @constructor
 */
export const judgeSuper = params =>
  axios({
    method: 'get',
    url: 'com.dfire.boss.center.soa.user.service.IUserClientService.isSuper',
    params
  })
