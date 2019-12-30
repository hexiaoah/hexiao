'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createUrl = undefined;

var _qs = require('./qs');

var _qs2 = _interopRequireDefault(_qs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 创建一个地址附带查询参数
 * @param  {String} baseUrl 基础地址
 * @param  {Object} params  key-value 对象,选填
 * @return {void}
 */
function createUrl(baseUrl, params) {
    var paramsStr = _qs2.default.stringify(params || {});
    if (!paramsStr) {
        return baseUrl;
    }

    var subStr = '';
    // 没有问号
    if (baseUrl.lastIndexOf('?') === -1) {
        subStr = '?';
    } else {
        // 最后一个字符
        var lastChar = baseUrl.slice(-1);
        // 如果最后接在最后一个字符不是是?并且是&加上一个&
        if (lastChar !== '&' && lastChar !== '?') {
            subStr = '&';
        }
    }

    return baseUrl + subStr + paramsStr;
}

exports.createUrl = createUrl;
exports.default = {
    createUrl: createUrl
};