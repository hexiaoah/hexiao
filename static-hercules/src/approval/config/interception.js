import {GATEWAY_BASE_URL, ENV, APP_KEY} from "apiConfig";
import axios from 'axios'
import {GW} from '@2dfire/gw-params'
import qs from 'qs'
import {getCookie} from '../../base/utils/AppUtil'
import router from "@2dfire/utils/router";
import handleError from '../utils/catchError'

const GWObject = qs.parse(GW)
const ENTITY_ID = router.route.query['entity_id'] || ""
const API_PARAMS = `?app_key=${APP_KEY}&s_eid=${ENTITY_ID}&method=`;

// 超时时间
axios.defaults.timeout = 30000
axios.defaults.headers.common['env'] = ENV;

// http请求拦截器
axios
    .interceptors
    .request
    .use(config => {
        let token = encodeURIComponent(getCookie("token"));
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
            handleError(data)
            return Promise.reject(res)
        }
    }, error => {
        handleError(error.data)
        return Promise.reject(error)
    })

export default axios
