const {
    GATEWAY_BASE_URL,
    WEBSOCKET_URL,
    ENV
} = require('apiConfig');
import {
    GW
} from '@2dfire/gw-params'

const APP_AUTH = '&' + GW + '&';

let getEnv = function (env) {
    console.log(ENV);
    if (ENV === 'publish' || ENV === 'pre' || ENV === 'daily') {
        return ENV
    } else {
        return env
    }
}

let getSocketUrl = function () {
    // if (ENV === 'publish') {
    //     return 'https://websocket.2dfire.com'
    // } else if (ENV === 'pre') {
    //     return 'https://websocket.2dfire-pre.com'
    // } else {
    //     return 'http://10.1.5.114:9003'
    // }
    return WEBSOCKET_URL;

}
console.log(APP_AUTH);

let config = {
    GET_CODE: {
        url: GATEWAY_BASE_URL + '?method=com.dfire.boss.center.login.service.IScanQrCodeLoginService.createScanQrCode' + APP_AUTH,
        env: getEnv('0355c5250fb945a1b83235dae80850d6')
    },
    SOCKET: getSocketUrl()
}
module.exports = {
    // 购买详情页
    ...config
}