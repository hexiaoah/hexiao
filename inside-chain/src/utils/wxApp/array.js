'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * 数组去重
 * @param  {Array}   arr
 * @return {Array}   去重后数组
 */
function arrayUnique(arr) {
    return Array.from(new Set(arr));
}

/**
 * 数组find,数组中满足提供的测试函数的第一个元素的值
 * @see also https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/find
 * @param  {Array} arr          数组
 * @param  {Function} predicate 在数组每一项上执行的函数
 * @return {Any}                满足提供的测试函数的第一个元素的值,否则返回 undefined
 */
function arrayFind(arr, predicate) {
    if (arr === null) {
        throw new TypeError('arrayFind called on null or undefined');
    }
    if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
    }
    var list = Object(arr);
    var length = list.length >>> 0;
    var thisArg = arguments[2];
    var value;

    for (var i = 0; i < length; i++) {
        value = list[i];
        if (predicate.call(thisArg, value, i, list)) {
            return value;
        }
    }
    return undefined;
}

/**
 * 数组find,返回数组中满足提供的测试函数的第一个元素的索引
 * @see also https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
 * @param  {Array} arr          数组
 * @param  {Function} predicate 在数组每一项上执行的函数
 * @return {Number}             满足提供的测试函数的第一个元素的索引。否则返回-1
 */
function arrayFindIndex(arr, predicate) {
    if (arr === null) {
        throw new TypeError('arrayFind called on null or undefined');
    }
    if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
    }
    var list = Object(arr);
    var length = list.length >>> 0;
    var thisArg = arguments[2];
    var value;

    for (var i = 0; i < length; i++) {
        value = list[i];
        if (predicate.call(thisArg, value, i, list)) {
            return i;
        }
    }
    return -1;
}

exports.arrayUnique = arrayUnique;
exports.arrayFind = arrayFind;
exports.arrayFindIndex = arrayFindIndex;
exports.default = {
    arrayUnique: arrayUnique,
    arrayFind: arrayFind,
    arrayFindIndex: arrayFindIndex
};