import axios from './interception'
import {
    API_BASE_URL,
    APP_KEY
} from "apiConfig";

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
    /**
     * 获取session信息（用于埋点）
     * */
    getSessionInfo(params) {
        return axios({
            method: 'GET',
            url: 'com.dfire.boss.center.soa.login.service.ILoginService.getSessionMapFromToken',
            params: params
        })
    },
    /** 获取address*/
    getAddress(params) {
        return axios({
            method: 'GET',
            url: 'com.dfire.loan.platform.activate.IActivateService.getRegion',
            params: params
        })
    },
    /**
     * 判断是否是超级管理员
     */
    judgeSuper(params) {
        return axios({
            method: 'GET',
            url: 'com.dfire.boss.center.soa.user.service.IUserClientService.isSuper',
            params: params
        })
    },
    /**
     * 查看申请状态
     */
    getPaymentStatus(params) {
        return axios({
            method: 'GET',
            url: 'com.dfire.fin.thirdpart.merchant.service.IPaymentAuthApplyService.getPaymentStatus',
            params: params
        })
    },
    /**
     * 获取开户银行
     */
    getBanks(params) {
        return axios({
            method: 'GET',
            url: 'com.dfire.boss.center.soa.pay.service.IBankService.getBanks',
            params: params
        })
    },
    /**
     * 获取开户省
     */
    getBankProvince(params) {
        return axios({
            method: 'GET',
            url: 'com.dfire.boss.center.soa.pay.service.IBankService.getProvince',
            params: params
        })
    },
    /**
     * 获取开户市
     */
    getBankCity(params) {
        return axios({
            method: 'GET',
            url: 'com.dfire.boss.center.soa.pay.service.IBankService.getCities',
            params: params
        })
    },
    /**
     * 获取开户支行
     */
    getSubBanks(params) {
        return axios({
            method: 'GET',
            url: 'com.dfire.boss.center.soa.pay.service.IBankService.getSubBanks',
            params: params
        })
    },
    /**
     * 小微申请
     */
    authWxXw(params) {
        return axios({
            method: 'POST',
            url: 'com.dfire.fin.thirdpart.merchant.service.IPaymentAuthApplyService.authWxXw',
            params: params
        })
    },
    /**
     * 查看小微进件及升级资料
     */
    getWxXwAuthInfoAndUpgradeInfo(params) {
        return axios({
            method: 'GET',
            url: 'com.dfire.fin.thirdpart.merchant.service.IPaymentAuthApplyService.getWxXwAuthInfoAndXwUpgradeInfo',
            params: params
        })
    },
    /**
     * 查询签约是否已完成
     */
    querySignFinished(params) {
        return axios({
            method: 'GET',
            url: 'com.dfire.fin.thirdpart.merchant.service.querySignFinished',
            params: params
        })
    },
    /**
     * 启用小微
     */
    enableWxXw(params) {
        return axios({
            method: 'GET',
            url: 'com.dfire.fin.thirdpart.merchant.service.enableWxXw',
            params: params
        })
    },
    /**
     * 修改银行卡信息
     */
    modifyWxXwBankInfo(params) {
        return axios({
            method: 'POST',
            url: 'com.dfire.fin.thirdpart.merchant.service.modifyWxXwBankInfo',
            params: params
        })
    },
    /**
     * 修改联系信息 
     */
    modifyWxXwContactInfo(params) {
        return axios({
            method: 'POST',
            url: 'com.dfire.fin.thirdpart.merchant.service.modifyWxXwContactInfo',
            params: params
        })
    },
    /**
     * 小微升级资料
     */
    upgradeWxWx(params) {
        return axios({
            method: 'POST',
            url: 'com.dfire.fin.thirdpart.merchant.service.upgradeWxXw',
            params: params
        })
    },
    /**
     * 查询打款信息
     */
    getAccountVerifyInfo(params) {
        return axios({
            method: 'GET',
            url: 'com.dfire.fin.thirdpart.merchant.service.getAccountVerifyInfo',
            params: params
        })
    },
    /**
     * 查询是否已完成打款验证
     */
    queryVerifyAccountFinished(params) {
        return axios({
            method: 'GET',
            url: 'com.dfire.fin.thirdpart.merchant.service.queryVerifyAccountFinished',
            params: params
        })
    },
    /**
     * 使用OCR
     */
    ocrNetImage(params) {
        return axios({
            method: 'GET',
            url: 'com.dfire.boss.center.soa.ocr.service.IOcrApiClientService',
            params: params
        })
    },
    /**
     * 是否展示升级模块
     */
    getUpgradeIsShow(params) {
        return axios({
            method: 'GET',
            url: 'com.dfire.fin.thirdpart.merchant.service.IPaymentAuthApplyService.upgradeIsShow',
            params: params
        })
    }
}

export default API;