import axios from './interception'
import { API_BASE_URL, APP_KEY } from 'apiConfig'

const API = {

  /*获取担保交易账户信息*/
  getGuaranteeAccounts(params) {
    return axios({
      method: 'GET',
      url: 'com.dfire.fin.wallet.getGuaranteeAccounts',
      params: params
    })
  },
  //查询专用收款账户信息
  getBindCardInfo(params) {
    return axios({
      method: 'GET',
      url: 'com.dfire.presell.trade.service.IBindBankAccountFacade.queryBindCardInfo',
      params: params
    })
  },
  //查询是否开通专用收款账户信息
  checkOpenBindCard(params) {
      return axios({
        method: 'GET',
        url: 'com.dfire.presell.trade.service.IBindBankAccountFacade.checkOpenBindCard',
        params: params
      })
  },
  //查询银行信息
    getBankList(params) {
      return axios({
        method: 'GET',
        url: 'com.dfire.presell.trade.service.IBindBankAccountFacade.queryBanks',
        params: params
      })
  },
  //查询省份信息
  getBankProvince(params) {
      return axios({
        method: 'GET',
        url: 'com.dfire.presell.trade.service.IBindBankAccountFacade.getProvinceByBank',
        params: params
      })
  },
  //查询城市信息
  getBankCity(params) {
      return axios({
        method: 'GET',
        url: 'com.dfire.presell.trade.service.IBindBankAccountFacade.getCitiesByBank',
        params: params
      })
  },
  //开户支行
  getSubBanks(params) {
    return axios({
      method: 'GET',
      url: 'com.dfire.presell.trade.service.IBindBankAccountFacade.getSubBankByCityAndBank',
      params: params
    })
  },
  //短信验证码(新)
  sendMobileValidCode(data) {
    return axios({
      method: 'POST',
      url: 'com.dfire.presell.trade.service.IMerchantWalletManageFacade.sendMobileValidCode',
      data
    })
  },
  //绑定银行卡
  bindCardAccount(data) {
    return axios({
      method: 'POST',
      url: 'com.dfire.presell.trade.service.IBindBankAccountFacade.bindCardAccount',
      data
    })
  },
  //解绑账户
  unBindCardAccount(params) {
    return axios({
      method: 'GET',
      url: 'com.dfire.presell.trade.service.IBindBankAccountFacade.unBindCardAccount',
      params: params
    })
  },
  //撤回申请
  revokeBindCardAccount(params) {
    return axios({
      method: 'GET',
      url: 'com.dfire.presell.trade.service.IBindBankAccountFacade.revokeBindCardAccount',
      params: params
    })
  }, 
  //查询提现账户信息
  queryWithdrawBankAccountInfo(params) {
    return axios({
      method: 'GET',
      url: 'com.dfire.presell.trade.service.IBindBankAccountFacade.queryWithdrawBankAccountInfo',
      params: params
    })
  },
  //商户提现操作
  merchantWithdrawApplyNew(data) {
    return axios({
      method: 'POST',
      url: 'com.dfire.presell.trade.service.IMerchantWalletManageFacade.merchantWithdrawApply',
      data
    })
  },  
}

export default API
