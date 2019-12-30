/**
 * Created by hupo on 16/10/6.
 *
 */

const { API_BASE_URL, SHARE_BASE_URL} = require('apiConfig');

module.exports = {
    // meal基础请求
    API_BASE_URL,

    // marketing基础请求
    SHARE_BASE_URL,

    // 获取换绑此数
    getBindTimer: API_BASE_URL + '/bind/v1/bing_timer',

    // 获取手机号码
    checkMobileReg: API_BASE_URL + '/users/v1/is_mobile_reg',

    // 获取验证码
    GET_VERIFY_CODE: API_BASE_URL + '/bind/v1/get_code',

    // 验证手机
    COINFIRMvERIFY: API_BASE_URL + '/bind/v1/verify',

    //获取语音验证码
    GET_VOICE_CODE: API_BASE_URL + '/bind/v1/get_voice_code',
};
