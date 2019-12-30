import Vue from 'vue';

let ERR_INFO = {
  "ERR_OPS999": "登录超时,请重新登录",
}

function commonCatchError (e) {
  let message = ERR_INFO[e.errorCode]

  if (e.code === -1) {
    return Vue.prototype.$toast("授权失败，请重新扫码进入", false)
  }

  if (message) {
    return Vue.prototype.$toast(message, false)
  }

  return null
}

export default function (e) {
  let res = commonCatchError(e)

  if (res === null && e.message) {
    return Vue.prototype.$toast(e.message)
  }
}