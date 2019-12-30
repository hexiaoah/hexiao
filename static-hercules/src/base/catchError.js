const {
  warning: warningDialog
} = require("./components/dialogs/events");
let ERR_INFO = {
  "ERR_OPS999": "登录超时,请重新登录",
}

function catchError(e) {
  console.log(e)
  let message = ERR_INFO[e.errorCode]
  if (e.code === -1) {
      return warningDialog.showError("授权失败，请重新扫码进入", {
          canClose: false
      });
  }
  if (message) {
      return warningDialog.showError(message, {
          canClose: false
      });
  }
  if (e.message) {
      return warningDialog.showError(e.message, {
          canClose: false
      });
  }
}

export default catchError