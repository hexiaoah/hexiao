import Vue from "vue";
import _i from "@/i18n/index";
import Cookie from "@2dfire/utils/cookie";

// import iView from "iview";

// Vue.use(iView);


let ERR_INFO = {
    "400": _i("ERRORMSG.OPERATE.FAIL"),
    "401": _i("ERRORMSG.SERVER.FAIL"),
    "701": _i("ERRORMSG.CANNOT.MODIFY"),
    "702": _i("ERRORMSG.NOUSER"),
    "703": _i("ERRORMSG.EMPTY.PARAM"),
    "704": _i("ERRORMSG.MISMATCH"),
    "705": _i("ERRORMSG.PARAM.FORMAT"),
    "706": _i("ERRORMSG.URL.FORMAT"),
    "707": _i("ERRORMSG.EMAIL.USED"),
    "708": _i("ERRORMSG.ACCT.USED"),
    "709": _i("ERRORMSG.CELL.USED"),
    "710": _i("ERRORMSG.DEVELOPER.USED"),
    "711": _i("ERRORMSG.CANNOT.USE.MERCHANT.CODE"),
    "712": _i("ERRORMSG.NO.DEVELOPER"),
    "900": _i("ERRORMSG.CAPTCHA.ERROR"),
    "901": _i("ERRORMSG.ACCT.ERROR"),
    "902": _i("ERRORMSG.DEVELOPER.MISSING"),
    "903": _i("ERRORMSG.EMAIL.EMPTY"),
    "904": _i("ERRORMSG.AUTH.QR.ERROR"),
    "905": _i("ERRORMSG.AUTH.QR.INVALID"),
    "906": _i("ERRORMSG.AUTH.CHAIN.FORBID"),
    "907": _i("ERRORMSG.GET.AUTH.FAIL"),
    "908": _i("ERRORMSG.GET.AUTH.GROUP.FAIL"),
}

function catchError(e) {
    console.log('error!!!' +  e.result);
    var Modal = Vue.prototype.$Modal;
    if (e.result) {
        let errorCode = e.result.resultCode;
        let errorMsg = e.result.message;
        // 授权 未登录 或 登录过期 resultCode 为 -2
        console.log('modal',Modal)
        if (errorCode == -2) {
            let appId = e.appId || '';
            Modal.warning({
                title: _i('ERRORMSG.TITLE'),
                content: errorMsg,
                onOk: function () {
                    window.location.href= "../page/auth.html#/login?appId=" + appId
                }

            });
        }
        if(errorCode == 'SYSTEM_DEFAULT_ERROR'){
            Modal.warning({
                title: _i('ERRORMSG.TITLE'),
                content: errorMsg,
            });
        };
                // todo 根据错误码，替换文案或者不显示
        if (errorCode && ERR_INFO[errorCode]) {
            Modal.warning({
                title: _i('ERRORMSG.TITLE'),
                content: ERR_INFO[errorCode],
            });
        }
    }else{
        Modal.warning({
            title: _i('ERRORMSG.TITLE'),
            content: _i("ERRORMSG.EXPIRED.CREDENTIAL"),
            onOk: function () {
                Cookie.clear()
                window.location.href= "../page/index.html";
            }
        });
    }
}

export default catchError
