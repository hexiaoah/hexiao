import Vue from 'vue'

let ERR_INFO = {
  '0001': '网络暂时开小差了，请稍后重试' /*系统错误*/,
  '0002': '网络暂时开小差了，请稍后重试' /*数据库异常*/,
  '0003': '网络暂时开小差了，请稍后重试' /*空数据*/,
  '0004': '网络暂时开小差了，请稍后重试' /*贷款平台异常*/,
  '0005': '网络暂时开小差了，请稍后重试' /*缺少参数*/,

  DEFAULT_ERROR_CODE: ''
}

function catchError(err) {
  let message = ERR_INFO[err.errorCode]
  /*ERR_PUB 统一认为来自于网关的报错*/
  if (err.errorCode.indexOf('ERR_PUB') >= 0) {
    Vue.prototype.$toast('网络暂时开小差了，请稍后重试')
    return
  }
  if (message) {
    Vue.prototype.$toast(message)
  } else {
    Vue.prototype.$toast(err.message)
  }
}

export default catchError
