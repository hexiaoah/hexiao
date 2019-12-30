"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var mobilePhoneReg = /^1[3|4|5|7|8]\d{9}$/;

/**
 * 检验字符串是否符合手机规则
 * @param  {String} v
 * @return {Boolean}
 */
function isMobilePhone(v) {
    return mobilePhoneReg.test(v);
}

exports.isMobilePhone = isMobilePhone;
exports.default = {
    isMobilePhone: isMobilePhone
};