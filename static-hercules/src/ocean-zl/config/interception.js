import { GATEWAY_BASE_URL, ENV, APP_KEY } from 'apiConfig'
import axios from 'axios'
import { GW } from '@2dfire/gw-params'
import qs from 'qs'
import sessionStorage from '@2dfire/utils/sessionStorage'
import handleError from '../utils/catchError'

const GWObject = qs.parse(GW)
const API_PARAMS = `?app_key=${APP_KEY}&method=`

// 超时时间
axios.defaults.timeout = 30000
axios.defaults.headers.common['env'] = ENV

// http请求拦截器
axios.interceptors.request.use(
  config => {
    let token = sessionStorage.getItem('token')
    config.headers.common['token'] = token || ''
    config.url = GATEWAY_BASE_URL + API_PARAMS + config.url
    config.params = Object.assign({}, config.params, GWObject)
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// http响应拦截器
axios.interceptors.response.use(
  res => {
    let data = res.data
    if (data.code === 1) {
      return data.data.data
    } else {
      handleError(data)
      return Promise.reject(res)
    }
  },
  error => {
    handleError(error.data)
    return Promise.reject(error)
  }
)

export default axios
