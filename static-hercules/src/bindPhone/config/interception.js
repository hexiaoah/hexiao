import { GATEWAY_BASE_URL, ENV } from 'apiConfig';
import { APP_KEY } from '../config/index';
import axios from 'axios';
import { GW } from '@2dfire/gw-params';
import qs from 'qs';
import sessionStorage from '@2dfire/utils/sessionStorage';
import handleError from '../utils/catchError';

const GWObject = qs.parse(GW);
const API_PARAMS = `?app_key=${APP_KEY}&method=`;

let getEnv = function (env) {
    if (ENV === 'publish' || ENV === 'pre' || ENV === 'daily') {
        return ENV
    } else {
        return env
    }
}
// 超时时间
axios.defaults.timeout = 30000;
axios.defaults.headers.common['env'] =  getEnv("0355c5250fb945a1b83235dae80850d6");

// http请求拦截器
axios.interceptors.request.use(
    config => {
        let token = sessionStorage.getItem('token');
        config.headers.common['token'] = token || '';
        config.url = GATEWAY_BASE_URL + API_PARAMS + config.url;
        config.params = Object.assign({}, config.params, GWObject);
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
// http响应拦截器
axios.interceptors.response.use(
    res => {
        // 响应成功关闭loading
        let data = res.data;
        if (data.code === 1) {
            return data.data.data;
        } else {
            handleError(data);
            return Promise.reject(res);
        }
    },
    error => {
        handleError(error.data);
        return Promise.reject(error);
    }
);

export default axios;
