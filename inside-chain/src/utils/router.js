'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.route = exports.setUrlMirror = exports.getRealUrl = exports.navigateBack = exports.redirectTo = exports.navigateTo = undefined;

var _location = require('./location');

var _location2 = _interopRequireDefault(_location);

var _qs = require('./qs');

var _qs2 = _interopRequireDefault(_qs);

var _url = require('./url');

var _object = require('./object');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 地址转换(可选)
 * example:
 * let urlMirror = [
 *      {
 *          keyword: "/shop/page/",
 *          url: "/pages/menu/menu"
 *      }
 *   ];
 */
var urlMirror = undefined;

/**
 * 设置地址转换的镜像对象
 * @param  {Object} mirror 镜像对象
 */
function setUrlMirror(mirror) {
    if (mirror) {
        urlMirror = mirror;
    }
}

/**
 * 获取真实地址
 * @param  {String} baseUrl 跳转地址
 * @return {String} 镜像匹配后的地址
 */

function getRealUrl(baseUrl) {
    if (!urlMirror) {
        return baseUrl;
    }
    var realUrl = "";
    var urlList = baseUrl.split("?") || [];
    var params = urlList[1];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = urlMirror[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var value = _step.value;

            if (baseUrl.search(value.keyword) >= 0) {
                realUrl = value.url;
                break;
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    if (realUrl) {
        realUrl = realUrl + (params ? '?' + params : "");
    } else {
        realUrl = baseUrl;
    }
    return realUrl;
}

/**
 * 地址转跳
 * @param  {String} baseUrl 跳转地址
 * @param  {Object} params  key-value 对象,选填
 * @param  {Integer} delay  延迟跳转选填
 * @return {void}
 */

function navigateTo(baseUrl) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var delay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    baseUrl = getRealUrl(baseUrl);
    if (delay > 0) {
        setTimeout(function () {
            return navigateTo(baseUrl, params);
        }, delay);
    } else {
        _location2.default.navigateTo((0, _url.createUrl)(baseUrl, params));
    }
}

/**
 * 地址转跳,replace形式
 * @param  {String} baseUrl 跳转地址
 * @param  {Object} params key-value 对象,选填
 * @param  {Integer} delay  延迟跳转选填
 * @return {void}
 */

function redirectTo(baseUrl) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var delay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    baseUrl = getRealUrl(baseUrl);
    if (delay > 0) {
        setTimeout(function () {
            return redirectTo(baseUrl, params);
        }, delay);
    } else {
        _location2.default.redirectTo((0, _url.createUrl)(baseUrl, params));
    }
}

/**
 * 地址回退
 * @param  {Integer}  n     回退步数
 * @param  {Integer}  delay  延迟跳转选填
 * @return {void}
 */

function navigateBack(n) {
    var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    if (delay > 0) {
        setTimeout(function () {
            return navigateBack(n);
        }, delay);
    } else {
        _location2.default.navigateBack(n);
    }
}

// route
var oldQueryStr = '';
var oldQuery = {};
var route = {
    /**
     * search string
     * @type {String}
     */
    get search() {
        return _location2.default.search;
    },

    /**
     * hash string
     * @type {String}
     */
    get hash() {
        return _location2.default.hash;
    },

    /**
     * href string
     * @type {String}
     */
    get href() {
        return _location2.default.href;
    },

    set href(href) {
        _location2.default.href = href;
    },

    /**
     * 从url中取来的参数
     * @type {Object}
     */
    get query() {
        var search = _location2.default.search;
        var hash = _location2.default.hash;
        var newQueryStr = search + hash;
        if (oldQueryStr === newQueryStr) {
            return oldQuery;
        }
        oldQueryStr = newQueryStr;
        if (hash.indexOf('?') !== -1) {
            hash = _qs2.default.extract(hash);
        }
        return oldQuery = (0, _object.objectAssign)({}, _qs2.default.parse(search), _qs2.default.parse(hash));
    }
};

exports.navigateTo = navigateTo;
exports.redirectTo = redirectTo;
exports.navigateBack = navigateBack;
exports.getRealUrl = getRealUrl;
exports.setUrlMirror = setUrlMirror;
exports.route = route;
exports.default = {
    navigateTo: navigateTo,
    redirectTo: redirectTo,
    navigateBack: navigateBack,
    getRealUrl: getRealUrl,
    setUrlMirror: setUrlMirror,
    route: route
};