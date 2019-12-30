import axios from './interception'
const {GATEWAY_BASE_URL, ENV} = require('apiConfig');

const API = {
    /*获取区号列表*/
    getCountryCodeList() {
        return axios({
            method: 'GET',
            url: 'com.dfire.boss.center.soa.login.service.IUnifiedLoginClientService.listCountry'
        })
    },

    /*获取验证码*/
    getCode(params) {
        return axios({
            method: 'GET',
            url: 'com.dfire.boss.center.soa.login.service.IScanQrCodeLoginService.sendVerCodeForH5',
            params:params
        })
    },

    /*绑定手机号码*/
    bindMobile(params){
        return axios({
            method: 'GET',
            url: 'com.dfire.boss.center.soa.login.service.IScanQrCodeLoginService.bindMobileAndLogin',
            params:params
        })
    },

    /*获取二维码*/
    getScanCode(params){
        return axios({
            method: 'GET',
            url: 'com.dfire.boss.center.soa.login.service.IScanQrCodeLoginService.createScanQrCodeV2',
            params:params
        })
    },

    /*绑定用户和码关系（在扫码进去的落地页调用）*/
    getBindQrCodeForH5(params){
        return axios({
            method: 'GET',
            url: 'com.dfire.boss.center.soa.login.service.IScanQrCodeLoginService.bindQrCodeForH5',
            params:params
        })
    },

    /*确认登录*/
    getScanLoginForH5(params){
        return axios({
            method: 'GET',
            url: 'com.dfire.boss.center.soa.login.service.IScanQrCodeLoginService.scanLoginForH5',
            params:params
        })
    },

    getSocketUrl(){
        if (ENV === 'publish') {
            return 'https://websocket.2dfire.com'
        } else if (ENV === 'pre') {
            return 'https://websocket.2dfire-pre.com'
        } else {
            return 'http://10.1.5.114:9003'
        }
    }
}

export default API;