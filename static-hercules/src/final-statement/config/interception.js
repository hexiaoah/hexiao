import {GATEWAY_BASE_URL, ENV,APP_KEY} from "apiConfig";
import axios from 'axios'
import {GW} from '@2dfire/gw-params'
import qs from 'qs'
import sessionStorage from "@2dfire/utils/sessionStorage";
import Vue from 'vue'

const GWObject = qs.parse(GW)
const API_PARAMS = `?app_key=${APP_KEY}&method=`;

// 超时时间
axios.defaults.timeout = 30000
axios.defaults.headers.common['env'] = '56660396ae55428694921a3d18949fec';
// axios.defaults.headers.common['excludefilter'] = 'UserAuthFilter'
let ERR_INFO = {
}
function catchError(err) {
    let message = ERR_INFO[err.errorCode]
    /*ERR_PUB 统一认为来自于网关的报错*/
    if (err.errorCode.indexOf('ERR_PUB') >= 0) {
        Vue.prototype.$toast("网络暂时开小差了，请稍后重试")
        return
    }
    if (message) {
        Vue.prototype.$toast(message)
    } else {
        console.log(err.message)
        Vue.prototype.$toast(err.message)
    }
}

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
            catchError(data)
            return Promise.reject(res)
        }
    }, error => {
        catchError(error.data)
        return Promise.reject(error)
    })

export default axios
