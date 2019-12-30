const {SHARE_BASE_URL, API_BASE_URL} = require("apiConfig");
const ACTIVITY_API_URL = API_BASE_URL + '/koubei_cash_server';
const ACTIVITY_SHARE_URL = SHARE_BASE_URL+ '/koubei_cash_server';
module.exports = {
    // 发送验证码
    GET_PHONE_CODE:API_BASE_URL+'/bind/v1/get_code',
    // 验证码有效性验证并换绑手机号
    GET_BIND_PHONE:API_BASE_URL+'/bind/v1/verify',
    // 离线登录
    OFF_LINE_CODE:API_BASE_URL+'/cash/v1/cash_offline_login',
    // 在线登录
    GET_LOGIN:API_BASE_URL+'/cash/v1/cash_online_login',
    // 区码
    GET_AREA_CODE:API_BASE_URL+'/bind/v1/get_country_code',
    //    单纯校验验证码
    VERIFY_CODE: API_BASE_URL + '/bind/v1/verify_code',

};