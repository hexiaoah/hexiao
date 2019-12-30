'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.filterOptions = exports.createHide = exports.createShowWithLevel = exports.createShow = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _eventEmitter = require('./eventEmitter');

var _eventEmitter2 = _interopRequireDefault(_eventEmitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 产生参数
 * @param  {String|Object} arg1     message或是options
 * @param  {Function|null} callback 回调
 * @param  {Object} defaultOptions  默认参数
 * @return {Object}                 可以召唤弹窗的完整参数
 */
function filterOptions() {
    var arg1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var callback = arguments[1];
    var defaultOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var callbackOptions = typeof callback === 'function' ? { callback: callback } : {};

    if (typeof arg1 === 'string') {
        return _extends({}, defaultOptions, { content: arg1 }, callbackOptions);
    }
    if ((typeof arg1 === 'undefined' ? 'undefined' : _typeof(arg1)) === 'object') {
        return _extends({}, defaultOptions, arg1, callbackOptions);
    }
    throw new Error('arg1 不是字符串也不是对象');
}

/**
 * 创建show方法
 * @param  {String} type    弹窗类型
 * @param  {Object} options 默认参数
 * @return {Function}       show方法
 */
function createShow(type, options) {
    /**
     * show方法
     * @param  {String|Object} arg1     message或是options
     * @param  {Function|null} callback 回调
     * @return {Void}
     */

    return function show(arg1, callback) {
        return _eventEmitter2.default.show(type, filterOptions(arg1, callback, options));
    };
}

/**
 * 创建show方法, 第二个参数为level
 * @param  {String} type  弹窗类型
 * @param  {String} level 弹窗级别
 * @return {Function}     show方法
 */
function createShowWithLevel(type, level) {
    return createShow(type, {
        level: level
    });
}

function createHide(type) {
    return function hide() {
        _eventEmitter2.default.hide(type);
    };
}

exports.createShow = createShow;
exports.createShowWithLevel = createShowWithLevel;
exports.createHide = createHide;
exports.filterOptions = filterOptions;