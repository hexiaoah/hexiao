/*
 * @Author: Octree
 * @Date: 2017-04-05 11:00:09
 * @Last Modified by: Octree
 * @Last Modified time: 2017-06-01 10:03:36
 */
import axios from 'axios'
import {loading} from "./loading";
import {GATEWAY_BASE_URL, ENV, APP_KEY} from "apiConfig";

const Loading = new loading();

import sessionStorage from "@2dfire/utils/sessionStorage";


import {GW} from '@2dfire/gw-params'
import qs from 'qs'

const GWObject = qs.parse(GW)

// 超时时间
axios.defaults.timeout = 30000
const ERROR_TYPES = {
    UNDEFINED_TOKEN: "undefined_token", // 未定义token
    CANCLED: "cancled", // 被取消
    NETWORK_FAIL: "network_fail", // 网络失败
    RESULT_FAIL: "result_fail" // 结果失败
};
/**
 * http请求拦截器
 * */
axios
    .interceptors
    .request
    .use(config => {
        let token = sessionStorage.getItem("token");
        if (token) {
            config.headers.common['token'] = token;
        }
        config.headers.common['env'] = config.env|| ENV;
        config.params.token = token || '';
        config.params.method = config.url || '';
        config.params.app_key = APP_KEY;
        config.url = GATEWAY_BASE_URL;
        config.params = Object.assign({}, config.params, GWObject)
        /** 是否需要加载动画 */
        if (config.loading) {
            Loading.loadingStart(config.loading || false);
        }
        return config
    }, error => {
        return Promise.reject(error)
    })
/**
 * http响应拦截器
 * */
axios
    .interceptors
    .response
    .use(response => {
        let data = response.data
        // 响应成功关闭loading
        if (response.config && response.config.loading) {
            Loading.loadingEnd(response.config.loading || false);
        }
        if (data.code === 1) {
            return data.data
        } else {
            return Promise.reject({
                errorType: ERROR_TYPES.RESULT_FAIL,
                result:data,
                response
            });
        }
    }, error => {
        return Promise.reject(error)
    });

export default axios
