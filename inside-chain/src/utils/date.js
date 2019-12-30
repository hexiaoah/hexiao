'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

// 格式化 日期
function dateFormat(date, fmt) {
    // author: meizz
    var o = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'h+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        'S': date.getMilliseconds // 毫秒
        () };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            var v = o[k] + '';
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? v : ('00' + v).substr(v.length));
        }
    }
    return fmt;
}

// 获取时间戳
function getTimeStamp() {
    return new Date().valueOf();
}

exports.dateFormat = dateFormat;
exports.getTimeStamp = getTimeStamp;
exports.default = {
    dateFormat: dateFormat,
    getTimeStamp: getTimeStamp
};