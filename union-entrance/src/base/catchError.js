import {Modal} from "iview";

let ERR_INFO = {
    "400": "操作失败",
    "401": "服务器异常，请联系技术!",
    "701": "无法修改其他商户信息",
    "702": "查询不到对应用户",
    "703": "参数为空",
    "704": "邮箱和账号不匹配",
    // "705": "参数格式错误",
    "705": "url格式错误，需以http://开头",
    "706": "邮箱已被注册",
    "707": "账户已被注册",
    "708": "手机已被注册",
    "709": "开发者已被注册，无需重新注册",
    "711": "开发者账号不能用商户编码,请重新填写。",
    "712": "没有找到对应开发者...",
    "900": "验证码错误",
    "901": "账号或密码错误!",
    "902": "请输入开发者账号!",
    "903": "邮箱为必填项",
    "904": "应用授权二维码编码错误",
    "905": "应用授权二维码编码已失效",
    "906": "不能使用连锁店铺进行授权",
    "907": "获取权限失败!",
    "908": "获取权限组失败!",


}

function catchError(e) {
    console.log('error!!!', e);
    if (e.result) {
        let errorCode = e.result.resultCode;
        let errorMsg = e.result.message;
        // 授权 未登录 或 登录过期 resultCode 为 -2
        if (errorCode == -2) {
            let appId = e.appId || '';
            Modal.warning({
                title: '请注意',
                content: errorMsg,
                onOk: function () {
                    window.location.href= "../page/auth.html#/login?appId=" + appId
                }

            });
        }
        if(errorCode == 'SYSTEM_DEFAULT_ERROR'){
            Modal.warning({
                title: '请注意',
                content: errorMsg,
            });
        };
                // todo 根据错误码，替换文案或者不显示
        if (errorCode && ERR_INFO[errorCode]) {
            // if (errorCode == "SYSTEM_DEFAULT_ERROR" || errorCode == "" || errorCode == "") {
            //     Modal.warning({
            //         title: '请注意',
            //         content: errorMsg,
            //     });
            // } else {
            //     Modal.warning({
            //         title: '请注意',
            //         content: ERR_INFO[errorCode],
            //     });
            // }
            Modal.warning({
                title: '请注意',
                content: ERR_INFO[errorCode],
            });
        }
    }
}

export default catchError
