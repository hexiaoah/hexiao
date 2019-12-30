'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

/**
 * old: `WXUtil.format_number`
 * 格式化的数字, 四舍五入保留两位小数
 * @param  {Number} pnumber     需要格式化的数字
 * @return {String}             保留两位小数的字符串
 * @example
 * numberFormat(20.495) // 20.50
 * numberFormat(20.494) // 20.49
 * numberFormat(-20.495) // -20.50
 * numberFormat(-20.494) // -20.49
 * numberFormat('asd') // 0.00
 * numberFormat(true) // 0.00
 */
function numberFormat(number) {
    if (Number.isNaN(+(number + ''))) {
        return '0.00';
    }
    return (Math.round(Math.abs(number) * 100) / (number < 0 ? -100 : 100)).toFixed(2);
}

/**
 * old: `AppUtil.fixedFenMoney`
 * 格式化支付金额（字符串，单位分）,numberFormat有四舍五入的功能
 * @param  {Number|String}  m     需要格式化的数字（单位分）
 * @return {String}               保留两位小数的字符串
 */

function numberFixedFen(m) {
    return numberFormat(m / 100);
}

/**
 * old: `AppUtil.fixedYuanMoney`
 * 格式化支付金额（字符串，单位元）,numberFormat有四舍五入的功能
 * @param  {Number|String}  m     需要格式化的数字（单位元）
 * @return {String}               保留两位小数的字符串
 */

function numberFixedYuan(m) {
    return numberFormat(m);
}

/**
 * 转换为非负整数
 * @param  {Number|String} num    需要转换的数
 * @return {Integer}              转换后的数
 */

function toNonNegativeInteger(num) {
    if (Number.isNaN(+(num + ''))) {
        return 0;
    }
    return Math.max(parseInt(num, 10), 0);
}

exports.numberFormat = numberFormat;
exports.numberFixedFen = numberFixedFen;
exports.numberFixedYuan = numberFixedYuan;
exports.toNonNegativeInteger = toNonNegativeInteger;
exports.default = {
    numberFormat: numberFormat,
    numberFixedFen: numberFixedFen,
    numberFixedYuan: numberFixedYuan,
    toNonNegativeInteger: toNonNegativeInteger
};