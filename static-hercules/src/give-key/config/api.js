import axios from './interception'
import {
    API_BASE_URL,
    APP_KEY
} from "apiConfig";
import qs from 'qs'

const API = {
    /*获取session信息*/
    getSessionMap() {
        return axios({
            method: 'GET',
            url: 'com.dfire.boss.center.soa.login.service.ILoginService.getSessionMapFromToken',
            params: {
                appKey: APP_KEY
            }
        })
    },
    /*获取店铺试用状态*/
    getShopVoByEntityId(params) {
        return axios({
            method: 'GET',
            url: 'com.dfire.soa.cloudcash.getShopVoByEntityId',
            params: params
        })
    },
    /**获取签到信息 */
    getSingInInfo(params) {
        return axios({
            method: 'GET',
            url: 'com.dfire.soa.cloudcash.getSignInInfoByEntityId',
            params: params
        })
    },
    /**签到 */
    signIn(params) {
        return axios({
            method: 'GET',
            url: 'com.dfire.soa.cloudcash.keepSignIn',
            params: params
        })
    },
}

export default API;
