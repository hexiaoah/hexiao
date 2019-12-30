import {GATEWAY_BASE_URL, ENV} from "apiConfig";
import axios from 'axios'
import {GW} from '@2dfire/gw-params'
import qs from 'qs'
import handleError from '../libs/catchError'
import sessionStorage from "@2dfire/utils/sessionStorage"

const GWObject = qs.parse(GW)
const API_PARAMS = '?app_key=200800&method=';

// 超时时间
axios.defaults.timeout = 30000
axios.defaults.headers.common['env'] = ENV;

// http请求拦截器
axios
    .interceptors
    .request
    .use(config => {
        let token = sessionStorage.getItem("token");
        config.headers.common['token'] = token || "";
        config.url = GATEWAY_BASE_URL + API_PARAMS + config.url
        config.params = Object.assign({}, config.params, GWObject)
        return config
    }, error => {
        return Promise.reject(error)
    })
// http响应拦截器
axios
    .interceptors
    .response
    .use(res => { // 响应成功关闭loading
        let data = res.data
        if (data.code === 1) {
            return data.data.data
        } else {
            if (res.config.url === GATEWAY_BASE_URL + API_PARAMS + 'com.dfire.boss.center.soa.ocr.service.IOcrApiClientService') { // OCR接口需要降级处理,不展示错误信息
                console.log('ocr接口调用失败')
            } else if ((res.config.url === GATEWAY_BASE_URL + API_PARAMS + 'com.dfire.fin.thirdpart.merchant.service.modifyWxXwBankInfo') || 
                (res.config.url === GATEWAY_BASE_URL + API_PARAMS + 'com.dfire.fin.thirdpart.merchant.service.modifyWxXwContactInfo')) { // 修改联系信息和银行卡页面需要特殊处理
                return data
            }
            else {
                handleError(data)
            }
            return Promise.reject(res)
        }
    }, error => {
        handleError(error.data)
        return Promise.reject(error)
    })

export default axios
