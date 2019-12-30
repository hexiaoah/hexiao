import axios from 'axios'
import {
    GW
} from '@2dfire/gw-params'
import catchError from './catchError'
const {
    getCookie
} = require("./utils/AppUtil")
const {
    warning: warningDialog
} = require("./components/dialogs/events")
const Promise = require("promise")
import {
    API_BASE_URL,
    ENV,
    GATEWAY_BASE_URL
} from "apiConfig"
/**
 * 创建一个地址附带查询参数
 * @param  {String} baseUrl 基础地址
 * @param  {Object} params  key-value 对象,选填  
 * @return {void}
 */
function createUrlWithToken(baseUrl, token) {
    let subStr = "";
    // 没有问号
    if (baseUrl.lastIndexOf("?") === -1) {
        subStr = "?";
    } else {
        // 最后一个字符
        const lastChar = baseUrl.slice(-1);
        // 如果最后接在最后一个字符不是是?并且是&加上一个&
        if (lastChar !== "&" && lastChar === "?") {
            subStr = "&";
        }
    }

    return baseUrl + subStr + "xtoken=" + token;
}
// 超时时间
axios.defaults.timeout = 30000
/**
 * @config  isToken      是否需要token 默认为true 
 * @config  isGw         是否走网关 默认为false 
 * @config  isUrl        是否拼接url 默认为false 
 * @config  isCatch      是否catchError 默认为false 接口异常不影响主流程 
 * @config  method       请求方式(POST/GET/DELETE/PUT/HEAD/PATCH)默认为GET
 * @config  url          请求接口路径
 * @config  data         请求方式为'PUT', 'POST', 和 'PATCH'时发送的参数
 * @config  params       请求方式为'GET', 'DELETE', 和 'HEAD'时发送的参数
 */
// http请求拦截器
axios
    .interceptors
    .request
    .use((config) => {
        let token = getCookie("token") || '';
        let yToken = getCookie('ytoken') || '';
        if (yToken === 'undefined' || yToken === 'null') {
            yToken = '';
        }
        if (token === '' || token === undefined || token === null || token === 'undefined' || token === 'null') {
            token = yToken;
        }
        let needToken = true;
        // 此写法只为了兼容老项目，其他工程则需要将报错处理配置在axios的配置上
        if (typeof (config.isToken) == "boolean") {
            needToken = config.isToken;
        }
        // 是否走网关
        if (config.isGw) {
            config.headers.common['env'] = ENV;
            config.url = `${GATEWAY_BASE_URL}?${GW}&${config.url}`;
            return config
        }
        // 是否需要token
        else if (needToken) {
            if (!token) {
                warningDialog.showError("授权失败，请重新扫码", {
                    canClose: false
                });
                console.warn("没有token");
                return Promise.reject("没有token");
            }
            config.url = createUrlWithToken(config.url, token);
        }
        else if (config.isUrl) {
            return config
        }
        config.url = API_BASE_URL + config.url;
        return config
    }, error => {
        return Promise.reject(error)
    })
// http响应拦截器
axios
    .interceptors
    .response
    .use(res => {
        console.log(res)
        let data = res.data;
        let baseConfig = res.config;
        const handleError = baseConfig.handleError || catchError
        if (data.code === 1) {
            // 网关
            if (baseConfig.isGw) {
                return data.data.data
            }
            return data.data
        } else {
            baseConfig.isCatch?'': handleError(data);
            return Promise.reject(data)
        }
    }, error => {
        if (!error.status) {
            return warningDialog.showError("网络请求失败", {
                canClose: false
            });
        }
        return Promise.reject(error)
    })
/*
    demo 
        // 默认配置项
        axios.defaults.isToken = false
        axios.defaults.isGw = true
        // 客户列表
        customerList(data) {
            return axios({
                method: 'POST',
                url: '/crm/v1/customer/getCustomerList.bsh',
                data: qs.stringify(data),
                withCredentials:true,
                isGw:false
            })
        },
        // 网关
        gwParams(groupId, pageIndex = 1, pageSize = 10, isOrderByNew = false){
            return axios({
                method:'POST',
                url:'app_key=200006&method=com.dfire.boss.center.business.service.ICourseClientService.getSimpleCourseVoByQuery',
                data:{ groupId, pageIndex, pageSize, isOrderByNew },
            })
        },
        getGwParams(){
            API.gwParams()
            .then(data=>{
            })
      }
*/

export default axios 