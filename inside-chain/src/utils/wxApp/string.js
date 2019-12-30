'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

/**
 * 清除字符串两边空格
 * @param  {String} str
 * @return {String}
 */
function stringTrim(str) {
    return str.replace(/^\s*|\s*$/g, '');
}

/**
 * 清除字符串左边空格
 * @param  {String} str
 * @return {String}
 */
function stringTrimLeft(str) {
    return str.replace(/^\s*/, '');
}

/**
 * 清除字符串右边空格
 * @param  {String} str
 * @return {String}
 */
function stringTrimRight(str) {
    return str.replace(/\s*$/, '');
}

/**
 * 字符是否以compareStr开头
 * @param  {String} str
 * @param  {String} compareStr
 * @return {Boolean}
 */
function startWith(str, compareStr) {
    return str.indexOf(compareStr) === 0;
}

/**
 * 转换为int类型
 * @param  {String} str
 * @return {Boolean}
 */
function toInt(str) {
    var num = parseInt(str);
    return isNaN(num) ? 0 : num;
}

/**
 * 转换为int类型的1或0
 * @param  {String} str
 * @return {Boolean}
 */
function toIntBool(str) {
    var bool = str;
    if (typeof str == 'string') {
        bool = toInt(str);
    }
    return bool ? 1 : 0;
}

// polyfill startWith
if (!String.prototype.startWith) {
    String.prototype.startWith = function (compareStr) {
        return startWith(this, compareStr);
    };
}

/**
 * old: `type.toJson`
 * 字符串转为对象
 * @param  {String} v 需要parse的字符串
 * @return {Object}
 */
function toJson(v) {
    var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    try {
        return JSON.parse(v) || defaultValue;
    } catch (e) {
        return {};
    }
}

exports.stringTrim = stringTrim;
exports.stringTrimLeft = stringTrimLeft;
exports.stringTrimRight = stringTrimRight;
exports.startWith = startWith;
exports.toInt = toInt;
exports.toIntBool = toIntBool;
exports.toJson = toJson;
exports.default = {
    stringTrim: stringTrim,
    stringTrimLeft: stringTrimLeft,
    stringTrimRight: stringTrimRight,
    startWith: startWith,
    toInt: toInt,
    toIntBool: toIntBool,
    toJson: toJson
};