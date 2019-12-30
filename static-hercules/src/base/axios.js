import axios from 'axios'
// import store from "../views/demo/store"

axios.defaults.timeout = 30000

// http请求拦截器
axios
  .interceptors
  .request
  .use(config => {
    // store.dispatch('common/getFetchLoading', true)
    return config
  }, error => {
    return Promise.reject(error)
  })
// http响应拦截器
axios
  .interceptors
  .response
  .use(res => { // 响应成功关闭loading
    // store.dispatch('common/getFetchLoading', false)
    let data = res.data
    return data
  }, error => {
    return Promise.reject(error)
  })

export default axios