import errorToast from './errorToast'

let ERR_INFO = {
  "ERR_OPS999": "登录超时,请重新登录",
}

function commonCatchError (e) {
  let message = ERR_INFO[e.errorCode]

  if (e.code === -1) {
    return errorToast.show('授权失败，请重新扫码进入', false)
  }

  if (message) {
    return error.show(message, false)
  }

  return null
}

export default function (e) {
  console.log(e)
  let res = commonCatchError(e)

  if (res === null && e.message) {
    return errorToast.show(e.message)
  }
}