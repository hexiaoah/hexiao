import {GATEWAY_BASE_URL, ENV, APP_KEY} from 'apiConfig'
import axios from './axios'


/**
 * 查询体检结果（头部）
 */
export const getResultTop = () => {
    let itemId = sessionStorage.getItem("itemId");
    let app_ver = sessionStorage.getItem("app_ver");
    return axios({
        method: 'post',
        url: `com.dfire.boss.center.healthcheck.IHealthCheckService.getDiffDetailResult`,
        params: {itemId,app_ver},

    })
}

/**
 * 查询体检结果
 */
export const getResult = () => {
    let itemId = sessionStorage.getItem("itemId");
    let app_ver = sessionStorage.getItem("app_ver");
    return axios({
        method: 'post',
        url: `com.dfire.boss.center.healthcheck.IHealthCheckService.getItemDetailResult`,
        params: {itemId,app_ver},
    })
}

/**
 * 反馈
 */
export const feedback = (params) => {
    let itemId = sessionStorage.getItem("itemId");
    return axios({
        method: 'post',
        url: `com.dfire.boss.center.healthcheck.IHealthCheckService.saveFeedback`,
        params: {
            itemId,
            ...params
        },
    })
}


/**
 * 获取TOKEN信息
 */
export const getToken = (params) => {
    return axios({
        method: 'GET',
        url: 'com.dfire.soa.sso.ISessionManagerService.validateServiceTicket',
        params: {
            ...params,
            appKey: 200800
        }
    })
}
/**
 * 获取session信息（用于埋点）
 * */
export const getSessionInfo = (params) => {
    return axios({
        method: 'GET',
        url: 'com.dfire.boss.center.soa.login.service.ILoginService.getSessionMapFromToken',
        params: {
            ...params,
        }
    })
}