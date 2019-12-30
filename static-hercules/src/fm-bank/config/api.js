import axios from './interception'
import { API_BASE_URL, APP_KEY } from 'apiConfig'

const API = {
  /*获取TOKEN信息*/
  getToken(params) {
    return axios({
      method: 'GET',
      url: 'com.dfire.soa.sso.ISessionManagerService.validateServiceTicket',
      params: {
        appKey: APP_KEY,
        ...params
      }
    })
  },
  getSessionInfo(params) {
    return axios({
      method: 'GET',
      url:
        'com.dfire.boss.center.soa.login.service.ILoginService.getSessionMapFromToken',
      params: params
    })
  },
  /*首页- 账户明细*/
  getHomeInfo(params) {
    return axios({
      method: 'GET',
      url: 'com.dfire.fin.wallet.getHomeInfo',
      params: params
    })
  },
  /*商户钱包可用账户列表查询*/
  accountListQuery(params) {
    return axios({
      method: 'GET',
      url: 'com.dfire.fin.wallet.accountListQuery',
      params: params
    })
  },
  /*获取商户钱包提现流水列表*/
  getWithdrawSerialList(data) {
    return axios({
      method: 'POST',
      url: 'com.dfire.fin.wallet.getWithdrawSerialList',
      data
    })
  },
  /*获取商户钱包账户收支流水列表*/
  getAccountTradeList(data) {
    return axios({
      method: 'POST',
      url: 'com.dfire.fin.wallet.getAccountTradeList',
      data
    })
  },
  /*获取验证码*/
  sendValidCode(data) {
    return axios({
      method: 'POST',
      url: 'com.dfire.fin.wallet.sendValidCode',
      data
    })
  },
  /*提现申请*/
  merchantWithdrawApply(data) {
    return axios({
      method: 'POST',
      url: 'com.dfire.fin.wallet.withdrawApply',
      data
    })
  },
  /*获取商户提现验证码输入错误次数*/
  getValidCodeErrTimes(params) {
    return axios({
      method: 'GET',
      url: 'com.dfire.fin.wallet.getValidCodeErrTimes',
      params: params
    })
  },
  /*获取商户钱包当天提现次数*/
  getWithdrawTimes(params) {
    return axios({
      method: 'GET',
      url: 'com.dfire.fin.wallet.getWithdrawTimes',
      params: params
    })
  },
  /*检查提现是否需要短信验证码 2019 08 28 ADD*/
  checkIsNeedValidCode(params) {
    return axios({
      method: 'GET',
      url: 'com.dfire.fin.wallet.checkIsNeedValidCode',
      params: params
    })
  },

  /*
   *火拼拼担保交易 新增两个接口 修改三个接口
   * 2019 08 08
   * update1:com.dfire.fin.wallet.getHomeInfo
   * update2:com.dfire.fin.wallet.getAccountTradeList
   * update3:com.dfire.fin.wallet.withdrawApply
   * add1:com.dfire.fin.wallet.accountBankInfoQuery
   * add2:com.dfire.fin.wallet.getGuaranteeAccounts
   */

  /*账户银行信息查询*/
  accountBankInfoQuery(params) {
    return axios({
      method: 'GET',
      url: 'com.dfire.fin.wallet.accountBankInfoQuery',
      params: params
    })
  },
  /*获取担保交易账户信息*/
  getGuaranteeAccounts(params) {
    return axios({
      method: 'GET',
      url: 'com.dfire.fin.wallet.getGuaranteeAccounts',
      params: params
    })
  },
  /*
   * 新增接口：查询是否开通专用收款账户信息
   */
  checkOpenBindCard(params) {
    return axios({
      method: 'GET',
      url:
        'com.dfire.presell.trade.service.IBindBankAccountFacade.checkOpenBindCard',
      params: params
    })
  },
  /*
   * 新增连锁资金管理 新增两个接口 修改三个接口
   * 2019 11 20
   * update1: com.dfire.fin.wallet.updateChainAuthWithdraw  修改门店授权总部提现

   */

  /*
   *  新增接口：修改门店授权总部提现
   */
  updateChainAuthWithdraw(params) {
    return axios({
      method: 'GET',
      url: 'com.dfire.fin.wallet.updateChainAuthWithdraw',
      params: params
    })
  },

  /*
   *  新增接口：查询是否展示授权模块
   */
  isShowFundManageAuthorize(params) {
    return axios({
      method: 'GET',
      url: 'com.dfire.fin.wallet.isShowFundManageAuthorize',
      params: params
    })
  },

  /*
   *  新增接口：门店钱包查询授权总部提现
   */
  queryChainAuthWithdraw(params) {
    return axios({
      method: 'GET',
      url: 'com.dfire.fin.wallet.queryChainAuthWithdraw',
      params: params
    })
  },
  /*
   *  新增接口：通用钱包提现
   */
  commonWalletWithdraw(data) {
    return axios({
      method: 'POST',
      url: 'com.dfire.fin.wallet.commonWalletWithdraw',
      data
    })
  },
  /*
   *  新增接口：获取当前门店登录用户的职级
   */
  getUserRole(params) {
    return axios({
      method: 'GET',
      url: 'com.dfire.fin.wallet.getUserRole',
      params: params
    })
  }
}

export default API
