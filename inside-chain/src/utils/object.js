"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.objectAssign = exports.toStr = exports.selectKeys = exports.isEmpty = exports.clone = exports.objectMap = exports.objectForEach = exports.isUndefined = exports.isNull = exports.isNumber = exports.isString = exports.isFunction = exports.isArray = exports.isJson = exports.isPlainObject = exports.isObject = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _objectAssign = require("object-assign");

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (!Object.assign) {
    Object.assign = _objectAssign2.default;
}

/**
 * 用于将所有可枚举的属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。
 * objectAssign(target, ...sources)
 * @param  {Object} target    目标对象
 * @param  {Object} sources   (多个)源对象
 * @return {Object}
 * @example
 * objectAssign({ a: 1, b: 2 }, { a: 3, c: 4 }); // { a: 3, b: 2, c: 4 }
 */
var objectAssign = Object.assign;

var prototypeToString = Object.prototype.toString;

/**
 * 测试是否是对象
 * @param  {Any}  v
 * @return {Boolean}   true表示是,false表示不是
 */
function isObject(obj) {
    return prototypeToString.call(obj) === "[object Object]";
}

/**
 * 测试对象是否是纯粹的对象（通过 "{}" 或者 "new Object" 创建的）
 * @alias isJson
 * @param  {Any}  v
 * @return {Boolean}   true表示是,false表示不是
 */
function isPlainObject(obj) {
    // 检查是否是对象
    if (!isObject(obj)) {
        return false;
    }

    var proto = Object.getPrototypeOf(obj);

    // 如果对象没有prototype (e.g., `Object.create( null )`) 是简单对象
    if (!proto) {
        return true;
    }

    var hasOwn = Object.prototype.hasOwnProperty;

    // 如果对象的constructor和全局Object的constructor相同(e.g. {})
    var Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
    return typeof Ctor === "function" && hasOwn.toString.call(Ctor) === hasOwn.toString.call(Object);
}

var isJson = isPlainObject;

// Array 全局对象 的 isArray方法
if (!Array.isArray) {
    Array.isArray = function isArray(arg) {
        return prototypeToString.call(arg) === '[object Array]';
    };
}

/**
 * 判断是否是数组
 * @param  {Any}  v
 * @return {Boolean}   true表示是,false表示不是
 */
var isArray = Array.isArray;

/**
 * 判断是否是方法
 * @param  {Any}  v
 * @return {Boolean}   true表示是方法,false表示不是
 */
function isFunction(v) {
    return typeof v === 'function';
}

/**
 * 判断是否是字符串
 * @param  {Any}  v
 * @return {Boolean}   true表示是字符串,false表示不是
 */
function isString(v) {
    return typeof v === 'string';
}

/**
 * 判断是否是数字
 * @param  {Any}  v
 * @return {Boolean}   true表示是数字,false表示不是
 */
function isNumber(v) {
    return typeof v === 'number' && v === v;
}

/**
 * 判断是否是null
 * @param  {Any}  v
 * @return {Boolean}   true表示是null,false表示不是
 */
function isNull(v) {
    return v === null;
}

/**
 * 判断是否是undefined
 * @param  {Any}  v
 * @return {Boolean}   true表示是undefined,false表示不是
 */
function isUndefined(v) {
    return v === undefined;
}

/**
 * 对象forEach方法
 * @param  {Object}   obj
 * @param  {Function} cb  将被循环执行
 *      currentValue
 *          callback 的第一个参数，数组中当前被传递的元素。
 *      index
 *          callback 的第二个参数，数组中当前被传递的元素的索引。
 *      obj
 *          callback 的第三个参数，调用 map 方法的对象。
 * @return {Void}
 */
function objectForEach(obj, cb) {
    var hasOwn = Object.prototype.hasOwnProperty;
    for (var index in obj) {
        if (hasOwn.call(obj, index)) {
            cb.call(obj, obj[index], index, obj);
        }
    }
}

/**
 * 对象map方法
 * @param  {Object}   obj
 * @param  {Function} cb  原数组中的元素经过该方法后返回一个新的元素。
 *      currentValue
 *          callback 的第一个参数，数组中当前被传递的元素。
 *      index
 *          callback 的第二个参数，数组中当前被传递的元素的索引。
 *      obj
 *          callback 的第三个参数，调用 map 方法的对象。
 * @return {Object}
 */
function objectMap(obj, cb) {
    var newObj = {};
    objectForEach(obj, function (currentValue, index) {
        newObj[index] = cb.call(obj, obj[index], index, obj);
    });
    return newObj;
}

/**
 * 深层次clone
 * @param  {Any} o 需要clone的对象
 * @return {Any}   clone后的对象
 */
function clone(obj) {
    if (isArray(obj)) {
        return obj.map(clone);
    }

    // Handle Date
    if (obj instanceof Date) {
        return new Date(obj.getTime());
    }

    // 简单对象，挨个clone
    if (isPlainObject(obj)) {
        return objectMap(obj, clone);
    }

    // 以上之外，Function,Number,String,Boolean,null,undefined,非简单对象都直接返回
    return obj;
}

/**
 * isEmpty 是否为空
 * @param  {obj} 任意对象
 * @return {bol} true/false
 */
function isEmpty(obj) {

    // null and undefined are "empty"
    if (obj === null) return true;

    if (obj === undefined) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (typeof obj === "number") {
        return obj.length === 0;
    }
    if (typeof obj === "string") {
        return obj.length === 0;
    }

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    // bug:如果是Date类型,则总是会返回为空
    if ((typeof obj === "undefined" ? "undefined" : _typeof(obj)) === "object") {
        if (obj.length === undefined) {
            //对象
            for (var key in obj) {
                if (hasOwnProperty.call(obj, key)) return false;
            }
        } else {
            //数组
            return obj.length === 0;
        }
    }

    return true;
}

/**
 * add by suanrong
 * 使用obj中的ks组成新对象并返回
 * @param obj Object
 * @param ks [k1,k2,k3]
 */
function selectKeys(obj, ks) {
    obj = obj || {};
    var ret = {};
    for (var i = 0, len = ks.length; i < len; i++) {
        ret[ks[i]] = obj[ks[i]];
    }
    return ret;
}

/**
 * add by hupo
 * 转换为string
 */
function toStr(v) {
    if (v) {
        return JSON.stringify(v);
    }
    return '';
}

exports.isObject = isObject;
exports.isPlainObject = isPlainObject;
exports.isJson = isJson;
exports.isArray = isArray;
exports.isFunction = isFunction;
exports.isString = isString;
exports.isNumber = isNumber;
exports.isNull = isNull;
exports.isUndefined = isUndefined;
exports.objectForEach = objectForEach;
exports.objectMap = objectMap;
exports.clone = clone;
exports.isEmpty = isEmpty;
exports.selectKeys = selectKeys;
exports.toStr = toStr;
exports.objectAssign = objectAssign;
exports.default = {
    isObject: isObject,
    isPlainObject: isPlainObject,
    isJson: isJson,
    isArray: isArray,
    isFunction: isFunction,
    isString: isString,
    isNumber: isNumber,
    isNull: isNull,
    isUndefined: isUndefined,
    objectForEach: objectForEach,
    objectMap: objectMap,
    clone: clone,
    isEmpty: isEmpty,
    selectKeys: selectKeys,
    toStr: toStr,
    objectAssign: objectAssign
};