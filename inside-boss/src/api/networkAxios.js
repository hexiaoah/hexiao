import axios from 'axios'

import {currentAPIUrlNetwork, currentAPIUrlPrefix,currentUrlUploadRul} from '../utils/env'


// 获取当前运行时环境变量
export const currentEnvString = __ENV__ || 'DEV' // eslint-disable-line

import * as bridge from '../utils/bridge'
import cookie from '@2dfire/utils/cookie'

// 超时时间
// axios.defaults.timeout = 30000
// 不设置超时时间
axios.defaults.timeout = 0
// 全局 AppKey
const APP_KEY = '200800'
import { GW } from '@2dfire/gw-params'
import qs from 'qs'
import getUserInfo from "../utils/getUserInfo";

const GWObject = qs.parse(GW)
/**
 * http请求拦截器
 * */
axios.interceptors.request.use(
    config => {
        if(config.isWg===true) {
            const {token} = bridge.getInfoAsQuery()
            config.headers.common['token'] = config.headers.token || cookie.getItem('new-token') || token || ''
            config.headers.common['lang'] = 'zh_CN'
            config.headers.common['X-Token'] = undefined
            if (currentEnvString === 'PUBLISH') {
                config.headers.common['env'] = 'publish'
            } else if (currentEnvString === 'PRE') {
                config.headers.common['env'] = 'pre'
            } else {
                config.headers.common['env'] =
                    'daily'
            }
            config.params = Object.assign({}, config.params, GWObject)
            config.params.method = config.url || ''
            config.params.app_key = config.params.app_key || APP_KEY
            config.url = currentAPIUrlNetwork
            if (config.name) config.url += `/${config.name}`    // 在 url 上带上接口名称，便于调试


            // formdata形式的传参 对参数做进一步处理转换为  a=b&c=d&e=f 的格式
            if (config.postType === 'formData') {
                config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
                config.transformRequest = [function(data) {
                    let newData = ''
                    for (const k in data) {
                        newData += `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}&`
                    }
                    return newData
                }]
            }

        }else if(config.isUploadImg===true){
            config.headers.common['Content-Type'] = 'multipart/form-data';
            config.headers.common['app-id'] = '200800';
            config.headers.common['session-id'] = getUserInfo().token;
            config.url = currentUrlUploadRul+config.url
        }else {
            config.headers.common['X-Token'] = getUserInfo().token;
            config.headers.common['Accept'] = 'application/json, text/json';
            if(!config.url.includes('http')){
                config.url=currentAPIUrlPrefix+config.url;
            }
            config.headers.common['X-Requested-With'] ='XMLHttpRequest ';
            config.responseType ='json';
            config.withCredentials =false;
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)
/**
 * http响应拦截器
 * */
axios.interceptors.response.use(
    response => {
        let data = response.data
        if (data.code === 1) {
            return data.data
        } else {
            return Promise.reject({
                success: data.code && data.code === 1,
                message: data.message,
                errorCode: data.errorCode
            })
        }
    },
    error => {
        return Promise.reject(error)
    }
)

export default axios
