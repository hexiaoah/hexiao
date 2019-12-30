"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

// var APP_ARR = [/2dfire\/([\w]{5})/, /FBLC\/([\w]{5})/]
var APP_ARR = ["2dfire", "FBAN", "FBAV"];
var LANG_ARR = [{
    'tag': 'en-',
    'lang': 'en_US'
}, {
    'tag': 'zh-CN',
    'lang': 'zh_CN'
}, {
    'tag': 'zh-TW',
    'lang': 'zh_TW'
}, {
    'tag': 'ja-JP',
    'lang': 'ja_JP'
}];

var is2DFireApp = function is2DFireApp(ua) {
    if (!ua) {
        return;
    }

    return ua.indexOf("2dfire") > -1;
};
// 判断facebook
var isFacebookApp = function isFacebookApp(ua) {
    if (!ua) {
        return;
    }

    return ua.indexOf("FBAN") > -1 || ua.indexOf("FBAV") > -1;
};
// 判断移动端浏览器
var isMobileBrower = function isMobileBrower(ua) {
    if (!ua) {
        return;
    }

    return ua.indexOf('MicroMessenger') <= -1 && (ua.indexOf('Android') > -1 || ua.indexOf('iPhone') > -1);
};
// 获取 app/系统 语言标识
var appEnv = function appEnv() {
    var ua;
    var lang;

    if (window && window.navigator) {
        ua = navigator.userAgent;

        lang = navigator.browserLanguage || navigator.language;
    }

    // var lang = 'zh-TW';
    var uaLang = [];

    if (is2DFireApp(ua)) {
        uaLang = navigator.userAgent.match(/2dfire\/([\w]{5})/);

        return uaLang;
    }

    if (isFacebookApp(ua) || isMobileBrower(ua)) {
        LANG_ARR.some(function (e, i) {
            if (lang.indexOf(e.tag) > -1) {
                uaLang[1] = e.lang;

                return true;
            }
        });

        return uaLang;
    }
};
// var appEnv = function() {        
//     var uaLang = {};

//     APP_ARR.some((e, i) => {
//         uaLang = navigator.userAgent.match(e);

//         if (uaLang) {
//             return true;
//         }
//     })

//     return uaLang;
// }

// 获取 app/系统 语言标识
var appLanguage = function appLanguage() {
    var uaLang = appEnv();

    return uaLang && uaLang.length >= 2 ? uaLang[1] : 'zh_CN';
};

// 获取 系统 时区标识
var appTimezone = function appTimezone() {
    var date = new Date() + '';
    var index = date.indexOf('GMT');
    var tz = date.substring(index, index + 8);

    return tz;
};

var setHeaders = function setHeaders() {
    var hz = {};

    var lang = appLanguage();
    var tz = appTimezone();

    return {
        lang: lang,
        tz: tz
    };
};

var getHeaders = function getHeaders(param) {
    var ignore_headers = param.ignore_headers;

    var hz = setHeaders();

    var h = {};

    if (!ignore_headers) {
        h.tz = hz.tz;

        if (hz.lang) {
            h.lang = hz.lang;
        }
    }

    return h;
};

var getLang = function getLang() {
    return appLanguage();
};

exports.setHeaders = setHeaders;
exports.getHeaders = getHeaders;
exports.getLang = getLang;