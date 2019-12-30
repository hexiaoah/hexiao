'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.navigateBack = exports.redirectTo = exports.navigateTo = exports.setCanJumpAlways = undefined;

var _object = require('./object');

var _qs = require('./qs');

var _qs2 = _interopRequireDefault(_qs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var href = '';
var search = '';
var history = [];

// 路由是否改变，用于判断是否需要从CurrentPages重新取url
// let isChange = false;

/**
 * 创建一个代理onLoad和onUnload的Page方法，应该在wx-component覆盖Page前执行
 * （因为在wx-component的Page.onLoad中迟于Component.onLoad执行）
 * ！！只有使用此方法产生的Page，获取search和href才是有效的
 *
 * @param  {Function} originalPage  原Page
 * @return {Function}               绑定历史的Page
 */
function createHistoryPage(originalPage) {
    return function historyPage(config) {
        var originalOnLoad = config.onLoad;
        var originalOnUnload = config.onUnload;

        originalPage((0, _object.objectAssign)(config, {
            onLoad: function historyPageHandleLoad() {
                var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                var curPage = getCurrentPages()[getCurrentPages().length - 1] || {};
                var route = curPage.route || curPage.__route__ || '';
                if (route && route[0] !== '/') {
                    route = '/' + route;
                }

                try {
                    options = (0, _object.objectMap)(options, function (v) {
                        return decodeURIComponent(v);
                    });
                } catch (e) {
                    console.error(e);
                }

                search = _qs2.default.stringify(options);

                if (search) {
                    search = '?' + search;
                }
                href = route + search;

                history.push({
                    // route,
                    // options,
                    search: search,
                    href: href
                });

                if (originalOnLoad) {
                    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                        args[_key - 1] = arguments[_key];
                    }

                    originalOnLoad.call.apply(originalOnLoad, [this, options].concat(args));
                }
            },
            onUnload: function historyPageHandleUnload(options) {
                if (originalOnUnload) {
                    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                        args[_key2 - 1] = arguments[_key2];
                    }

                    originalOnUnload.call.apply(originalOnUnload, [this, options].concat(args));
                }

                history.pop();
                if (history.length > 0) {
                    var route = history[history.length - 1];
                    search = route.search;
                    href = route.href;
                } else {
                    search = '';
                    href = '';
                }
            }
        }));
    };
}

var latestJumpTime = 0;
var latestJumpUrl = '';

/**
 * Android微信存在多次点击带跳转动作的按钮会跳转多次，
 * 如果是navigateTo则打开多个Page,此处对跳转间隔限制,在700毫秒内的第二次跳转无效
 * @return {Boolean} true 表示可以跳转，false表示不能
 */
var canJumpNow = function canJumpNow(url) {
    var nowTime = Date.now();
    if (nowTime - latestJumpTime < 700 && latestJumpUrl === url) {
        return false;
    }
    latestJumpUrl = url;
    latestJumpTime = nowTime;
    return true;
};

/**
 * 设置可以一直跳
 */
function setCanJumpAlways() {
    canJumpNow = function canJumpNow() {
        return true;
    };
}

function navigateTo(url) {
    if (!canJumpNow(url)) {
        return;
    }
    wx.navigateTo({ url: url });
}

function redirectTo(url) {
    if (!canJumpNow(url)) {
        return;
    }
    wx.redirectTo({ url: url });
}

function navigateBack() {
    var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

    wx.navigateBack(n);
}

exports.setCanJumpAlways = setCanJumpAlways;
exports.navigateTo = navigateTo;
exports.redirectTo = redirectTo;
exports.navigateBack = navigateBack;
exports.default = {
    navigateTo: navigateTo,
    redirectTo: redirectTo,
    navigateBack: navigateBack,
    get search() {
        return search;
    },
    // TODO 支持hash
    get hash() {
        return '';
    },
    get href() {
        return href;
    },
    set href(href) {
        navigateTo(href);
    },
    createHistoryPage: createHistoryPage
};