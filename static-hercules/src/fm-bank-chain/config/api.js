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
   /*
   *  新增接口：获取当前门店登录用户的职级
   */
  getUserRole(params) {
    return axios({
      method: 'GET',
      url: 'com.dfire.fin.wallet.getUserRole',
      params: params
    })
  },
  /*获取门店委托提现明细列表*/
  getShopWithdrawDetail(data) {
    return axios({
      method: 'POST',
      url: 'com.dfire.fin.chain.getShopWithdrawDetail',
      data
    })
  },

  /*获取总部委托提现记录列表*/
  getChainWithdrawRecordList(data) {
    return axios({
      method: 'POST',
      url: 'com.dfire.fin.chain.getChainWithdrawRecordList',
      data
    })
  },

  /*获得授权门店钱包信息列表*/
  getShopWalletInfoList(data) {
    return axios({
      method: 'POST',
      url: 'com.dfire.fin.chain.getShopWalletInfoList',
      data
    })
  },

  /*统计要提现的门店的总金额和总条数*/
  statChainPreApplyInfo(data) {
    return axios({
      method: 'POST',
      url: 'com.dfire.fin.chain.statChainPreApplyInfo',
      data
    })
  },

  /*获得授权门店钱包账户总余额*/
  getTotalWalletAmt(params) {
    return axios({
      method: 'GET',
      url: 'com.dfire.fin.chain.getTotalWalletAmt',
      params
    })
  },
  /*总部发起门店钱包提现申请*/
  authShopWithdrawApply(data) {
    return axios({
      method: 'POST',
      url: 'com.dfire.fin.chain.authShopWithdrawApply',
      data
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
}

export default API
