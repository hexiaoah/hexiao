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
    /** 获取banner*/
    getBanner(params) {
        return axios({
            method: 'POST',
            url: 'com.dfire.soa.boss.mg.service.IOptimizeBannerService.getBanner',
            params: params
        })
    },
    getInfo(params) {
        return axios({
            method: 'GET',
            url: 'com.dfire.soa.cloudcash.client.service.IOnlinePurchaseClientService.getShopInfo',
            params: params
        })
    },
    getProduct(params) {
        return axios({
            method: 'GET',
            url: 'com.dfire.soa.cloudcash.client.service.IOnlinePurchaseClientService.getProductList',
            params: params
        })
    }
}

export default API;