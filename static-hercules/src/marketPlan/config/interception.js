import {API_BASE_URL} from "apiConfig";
import axios from 'axios';
// import sessionStorage from "@2dfire/utils/sessionStorage.js"; 
import handleError from '../utils/catchError'


// 超时时间
axios.defaults.timeout = 30000 

// http请求拦截器
axios
    .interceptors
    .request
    .use(config => { 
        config.url = API_BASE_URL + config.url;
        config.params = Object.assign({}, config.params);
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
            return data.data
        } else {
            handleError(data)
            return Promise.reject(res)
        }
    }, error => {
        handleError(error.data)
        return Promise.reject(error)
    })

export default axios