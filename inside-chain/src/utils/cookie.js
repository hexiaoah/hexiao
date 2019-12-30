'use strict';

var _jsCookie = require('js-cookie');

var _createStorage = require('./createStorage');

var _createStorage2 = _interopRequireDefault(_createStorage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 主域名 不支持国家地区代码顶级域名（ccTLDs，如 .com.cn、.com.uk、.com.hk 等）
 * @type {String}
 *
 * document.domain ==> rootDomain
 * localhost           localhost
 * 127.0.0.1           127.0.0.1
 * a.b.qq.com          .qq.com
 * 123.2dfire.com      .2dfire.com
 * 123.2dfi-re.com     .2dfi-re.com
 * 123.中文.com        .中文.com
 * asd..com            asd..com
 * asd?1.23asd.com     .23asd.com
 */

/**
 * @see also https://github.com/js-cookie/js-cookie
 * @example
 *
 * set('name', 'value', { expires: 365, domain: '2dfire.net', path: '/static-noble' });
 * get('name');
 * remove('name', { domain: '2dfire.net', path: '/static-noble' });
 * clear('name', { domain: '2dfire.net' });
 */
var rootDomain = function getRootDomain(domain) {
    return (domain.match(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/) || domain.match(/(\.[^\ \.]+){2}$/i) || [domain])[0];
}(document.domain);

function setItem(name, value, attributes) {
    attributes = attributes || {};
    // 设默认域为主域
    attributes.domain = attributes.domain || rootDomain;
    (0, _jsCookie.set)(name, value, attributes);
}

function getItem(name, attributes) {
    attributes = attributes || {};
    // 设默认域为主域
    attributes.domain = attributes.domain || rootDomain;
    return (0, _jsCookie.get)(name, attributes);
}

function removeItem(name, attributes) {
    attributes = attributes || {};
    // 设默认域为主域
    attributes.domain = attributes.domain || rootDomain;
    (0, _jsCookie.remove)(name, attributes);
}

function clear(attributes) {
    attributes = attributes || {};
    // 设默认域为主域
    attributes.domain = attributes.domain || rootDomain;
    Object.keys((0, _jsCookie.get)()).forEach(function (cookie) {
        (0, _jsCookie.remove)(cookie, attributes);
    });
}

module.exports = (0, _createStorage2.default)({
    clear: clear, setItem: setItem, getItem: getItem, removeItem: removeItem
});

module.default = module.exports;