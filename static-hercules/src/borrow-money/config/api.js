/**
 * C端借款超市模块API
 */

import axios from './interception'
import { APP_KEY } from 'apiConfig'
export const getToken = params =>
  axios({
    method: 'GET',
    url: 'com.dfire.soa.sso.ISessionManagerService.validateServiceTicket',
    params: {
      appKey: APP_KEY,
      ...params
    }
  })

/*
 * 掌柜或者云收银查询贷款用户信息
 */
export const queryUserInfoByMemberId = params =>
  axios({
    method: 'GET',
    url: 'com.dfire.fin.loan.queryUserInfoByMemberId',
    params: params
  })
/*
 * 贷款产品列表
 */
export const getList = params =>
  axios({
    method: 'GET',
    url: 'com.dfire.fin.loan.getPersonalLoanPrdList',
    params
  })

/**
 * 根据二维火会员ID获取用户是否绑定
 * @param params
 * @property {string} consumerId 从火拼拼进来
 * @returns {AxiosPromise}
 */
export const checkUserInfoByConsumerId = params =>
  axios({
    method: 'GET',
    url: 'com.dfire.fin.loan.checkUserInfoByConsumerId',
    params
  })

/**
 * 根据thirdId检查用户是否绑定
 * @param params
 * @property {string} thirdId 从公众号进来
 * @returns {AxiosPromise}
 */
export const checkIsBindByThirdId = params =>
  axios({
    method: 'GET',
    url: 'com.dfire.fin.loan.checkIsBindByThirdId',
    params
  })

/**
 * 获取session信息（用于埋点）
 * */
export const getSessionMapFromToken = params =>
  axios({
    method: 'GET',
    url:
      'com.dfire.boss.center.soa.login.service.ILoginService.getSessionMapFromToken',
    params: params
  })

/**
 * 验证用户短信验证码发送
 * @param params
 * @property {string} mobile 手机号
 * @property {string} thirdId 第三方id
 * @returns {AxiosPromise}
 */
export const sendMobileValidCode = params =>
  axios({
    method: 'GET',
    url: 'com.dfire.fin.loan.sendMobileValidCode',
    params
  })

/**
 * 用户验证提交
 * @data data
 * @property {object} loanUserInfoRequest
 * @returns {AxiosPromise}
 */
export const userInfoCheckApply = data =>
  axios({
    method: 'POST',
    url: 'com.dfire.fin.loan.userInfoCheckApply',
    data
  })

/**
 * 获取验证码错误次数
 * @param params
 * @property {string} thirdId 第三方id
 * @returns {AxiosPromise}
 */
export const getValidCodeErrorTimes = params =>
  axios({
    method: 'GET',
    url: 'com.dfire.fin.loan.getValidCodeErrorTimes',
    params
  })
