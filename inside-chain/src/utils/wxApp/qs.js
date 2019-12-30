'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.extract = exports.parse = exports.stringify = undefined;

var _object = require('./object');

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 简单对象转化为query string,如果参数是对象使用JSON.parse转换
 * @param  {Object} params  参数 key-value
 * @return {String}
 * @example
 * stringify({ a: 123 }); // "a=123"
 * stringify({ a: [1] }); // "a=%5B1%5D"
 */

/**
 * @see also https://www.npmjs.com/package/query-string
 */
function stringify() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

    if (params === undefined) {
        return '';
    }
    if (!(0, _object.isPlainObject)(params)) {
        throw '请传入一个对象';
    }
    params = (0, _object.objectMap)(params, function (param) {
        if ((0, _object.isNull)(param) || (0, _object.isUndefined)(param) || param === '') {
            return '';
        }
        return (0, _object.isArray)(param) || (0, _object.isPlainObject)(param) ? JSON.stringify(param) : param;
    });
    return _queryString2.default.stringify(params);
}

/**
 * query string 转化为对象
 * @param  {String} q  query string
 * @return {Object}
 * @example
 * parse("a=123"); // { a: 123 }
 * parse("a=%5B1%5D"); // { a: "[1]" }
 */

var parse = _queryString2.default.parse;

/**
 * 从url中取出能被转化的query string
 * @param  {String} url   需要被提取的url
 * @return {String}
 * @example
 * extract(search); // 'chain_id=9&lottery_activity_id=b'
 */

var extract = _queryString2.default.extract;

exports.stringify = stringify;
exports.parse = parse;
exports.extract = extract;
exports.default = {
    stringify: stringify,
    parse: parse,
    extract: extract
};