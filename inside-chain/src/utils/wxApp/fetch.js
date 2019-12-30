'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setGlobalOptions = exports.dFireFetchWithoutGlobal = exports.dFireFetch = exports.FireFetch = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by hupo
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * on 16/10/11.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * node依赖 :   依赖于 zepto $.ajax 后期可以考虑把 zepto 的ajax 单独打包出来 封装成模块 或使用其他更干净的ajax npm 模块
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 本地依赖  :   track.js base.js baseStorage.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  option = {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *      url: "",                     (必选)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *      type: "get",
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *      success: callback,           (必选)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *      error: callback,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *      showLoading: true,         加载动画/统计相关  showLoading true/静默调用  false 不调用
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *      params: {},                  请求参数 json格式 会被加入url中
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *      data: {},                    post 请求的 data json格式
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *      beforeSend: callback,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *      warnMessage: "",
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *      infoMessage: "",
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *      errorMessage: "",
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *      contentType: "",             Content-Type
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *      withoutCookie: false,        Sending cookies 默认发送cookie 只有当 options.withoutCookie == true 时,可以不发送cookie
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *      timeout: "15000"             node-fetch 特性  不确定是否生效 待测试
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *      tempData                     其他临时数据, 主要用于ajax回调使用
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _alert = require('@2dfire/feed-back-auto/alert');

var _alert2 = _interopRequireDefault(_alert);

var _promise = require('./promise');

var _promise2 = _interopRequireDefault(_promise);

var _ajax = require('./ajax');

var _ajax2 = _interopRequireDefault(_ajax);

var _cookie = require('./cookie');

var _cookie2 = _interopRequireDefault(_cookie);

var _object = require('./object');

var _url = require('./url');

var _router = require('./router');

var _router2 = _interopRequireDefault(_router);

var _localStorage = require('./localStorage');

var _localStorage2 = _interopRequireDefault(_localStorage);

var _globalBasePage = require('./globalBasePage');

var _globalBasePage2 = _interopRequireDefault(_globalBasePage);

var _object2 = require('./object');

var _lib = require('@2dfire/common-i18n-tool/lib');

var _location = require('./location');

var _location2 = _interopRequireDefault(_location);

var _analytics = require('./analytics');

var _analytics2 = _interopRequireDefault(_analytics);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// 严重错误的code
var ERROR_CODES = [-1, -2];

var fecthGlobalOptions = {
    /**
     * 全局会话错误处理
     * @param  {Object} response 服务端返回结果
     * @return {Void}
     */
    handleGlobalError: function handleGlobalError(response) {
        if (+response.code === -1) {
            // 重新授权前需要清理cookie数据
            _cookie2.default.clear();
            _alert2.default.error({
                title: '您太久没有动静了',
                content: '请重新扫码',
                closeText: '',
                showIcon: false,
                duration: -1
            });
        }
    },

    /**
     * 全局获取url参数方法
     * @return {Object} QueryParams
     */
    getQueryParams: function queryParams() {
        return {
            xtoken: _cookie2.default.getItem("token") || _router2.default.route.query.token
        };
    }
};

/**
 * 设置全局会话超时处理
 * @param {Function} sessionOutHandler
 */
function setGlobalOptions(options) {
    (0, _object2.objectAssign)(fecthGlobalOptions, options);
}

var FireFetch = function () {
    function FireFetch(options) {
        _classCallCheck(this, FireFetch);

        if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) !== "object") {
            throw new Error("options must's object");
        }
        this.type = "get";
        this.timeout = 15000;
        this.isShowLoading = true;
        this.beforeSend = undefined;
        this.url = options.url;
        this.reload = options.reload;
        this.success = options.success;
        this.complete = options.complete;
        this.error = options.error;
        this.contentType = "application/x-www-form-urlencoded;application/json;charset=utf-8;";
        this.xhrFields = {
            withCredentials: true
        };
        // 其他
        this.warnMessage = options.warnMessage;
        this.infoMessage = options.infoMessage;
        this.errorMessage = options.errorMessage;
        // 统计相关

        this.url = (0, _url.createUrl)(this.url, options.params);

        if (options.type != undefined) {
            this.type = options.type;
        }

        if (options.contentType) {
            this.contentType = options.contentType;
        }

        if (options.data) {
            if (this.method == "get") {
                throw new Error("GET method can't send data, please modify 'data' to 'params' or use POST");
            }
            this.data = options.data;
        }

        if (options.withoutCookie) {
            this.xhrFields.withCredentials = false;
        }

        if (options.beforeSend) {
            this.beforeSend = options.beforeSend;
        }

        if (options.timeout !== undefined) {
            this.timeout = options.timeout;
        }
        if (options.showLoading !== undefined) {
            this.isShowLoading = options.showLoading;
        }
        if (options.tempData) {
            this.tempData = (0, _object.clone)(options.tempData);
        }
    }

    _createClass(FireFetch, [{
        key: 'successHandler',
        value: function successHandler(response, resolve, reject) {
            if (this.isShowLoading) {
                _globalBasePage2.default && _globalBasePage2.default.stopLoading();
            }

            // todo 这里的location.href需要做映射 by hupo 2017.6.28
            if (response.code == 2001) {
                _location2.default.href = "../page/blacklist.html?t=grunt_page_time";
                return false;
                // reject();
            }

            if (response.code == undefined || ERROR_CODES.indexOf(+response.code) !== -1) {
                this.globalErrorHandler(response); // 全局错误处理

                if (this.error) {
                    this.error(response);
                }
                if (_analytics2.default) {
                    // 新统计相关
                    var params = {
                        api: this.url,
                        code: response.code || "",
                        message: response.message || ""
                    };
                    _analytics2.default.fire("Er", "apiEr", params);
                }
                reject(response);
            } else {
                //每次接口返回了成功，就延长指定的cookie1Day
                // cookie.postPoneAll();
                if (this.success) {
                    if (!response.data) {
                        response.data = {};
                    }
                    this.success(response);
                }
                resolve(response);
            }
        }
    }, {
        key: 'errorHandler',
        value: function errorHandler(response) {
            if (this.isShowLoading) {
                _globalBasePage2.default && _globalBasePage2.default.stopLoading();
                this.globalErrorHandler(response);
            }

            if (this.error) {
                this.error(response);
            }

            if (_analytics2.default) {
                // 新统计相关
                var params = {
                    api: this.url,
                    code: response.code || "",
                    message: response.message || ""
                };
                _analytics2.default.fire("Er", "apiEr", params);
            }
        }

        // 全局的请求出错处理  (这部分不是很清楚 直接copy http.js原来的代码)

    }, {
        key: 'globalErrorHandler',
        value: function globalErrorHandler(response) {
            // 如果是全局错误，交给配置处理
            if (ERROR_CODES.indexOf(+response.code) !== -1) {
                fecthGlobalOptions.handleGlobalError(response);
                return;
            }

            if (this.isShowLoading) {
                if (this.reload) {
                    //是否重载
                    _globalBasePage2.default && _globalBasePage2.default.showInfo(_globalBasePage2.default.type.error, {
                        errorMessage: this.errorMessage,
                        reload: this.reload
                    });
                } else if (this.warnMessage) {
                    _globalBasePage2.default && _globalBasePage2.default.showInfo(_globalBasePage2.default.type.warn, { warnMessage: this.warnMessage });
                } else if (this.infoMessage) {
                    _globalBasePage2.default && _globalBasePage2.default.showInfo(_globalBasePage2.default.type.info, { infoMessage: this.infoMessage });
                }
            }
        }

        // 统计/token/时间戳/定位信息/灰度  (参考原 http.js 原来的代码)

    }, {
        key: 'otherInit',
        value: function otherInit() {
            var params = {
                xtoken: _cookie2.default.getItem("token"),
                t: new Date().getTime(),
                g_entityId: _cookie2.default.getItem("entity_id")
            };

            var gpsInfo = _localStorage2.default.getItem("gps"); //获取地理位置定位数据
            if (gpsInfo) {
                params["loc"] = gpsInfo;
            }

            // createUrl(this.url, params);
        }
    }, {
        key: 'doFetch',
        value: function doFetch() {
            var self = this;
            if (self.isShowLoading) {
                // todo globalBasePage
                _globalBasePage2.default && _globalBasePage2.default.startLoading({ content: "" });
            }

            // self.otherInit();
            var promise = new _promise2.default(function (resolve, reject) {
                (0, _ajax2.default)({
                    type: self.type,
                    url: self.url,
                    dataType: 'json',
                    crossDomain: true,
                    data: self.data,
                    headers: setHeaders(self.ignore_headers),
                    timeout: self.timeout,
                    contentType: self.contentType,
                    xhrFields: self.xhrFields,
                    beforeSend: function beforeSend() {
                        if (self.beforeSend) {
                            self.beforeSend();
                        }
                    },
                    success: function success(data) {
                        self.successHandler(data, resolve, reject);
                    },
                    complete: function complete() {
                        if (self.complete) {
                            self.complete();
                        }
                    },
                    error: function error(xhr, type, _error) {
                        var resp = {
                            xhr: xhr,
                            type: type,
                            error: _error
                        };
                        console.log("ajax error: ", resp);
                        self.errorHandler(resp);
                        reject(resp);
                    }
                });
            });
            return promise;
        }
    }]);

    return FireFetch;
}();

// 国际化标识


var setHeaders = function setHeaders(ignore_headers) {
    return (0, _lib.getHeaders)({
        ignore_headers: ignore_headers
    });
};

/**
 * fetch，将实例化FireFetch，并且执行FireFetch.doFetch
 * @param  {Object} options 请求配置
 * @return {Promise}
 */
function dFireFetch(options) {
    options.params = (0, _object2.objectAssign)({}, options.params || {}, fecthGlobalOptions.getQueryParams() || {});

    var dfFetch = new FireFetch(options);
    return dfFetch.doFetch();
}

/**
 * 没有全局信息的fetch
 * @param  {Object} options 请求配置
 * @return {Promise}
 */
function dFireFetchWithoutGlobal(options) {
    if (!options.params) {
        options.params = {};
    }
    var dfFetch = new FireFetch(options);
    return dfFetch.doFetch();
}

exports.FireFetch = FireFetch;
exports.dFireFetch = dFireFetch;
exports.dFireFetchWithoutGlobal = dFireFetchWithoutGlobal;
exports.setGlobalOptions = setGlobalOptions;
exports.default = {
    FireFetch: FireFetch,
    dFireFetch: dFireFetch,
    dFireFetchWithoutGlobal: dFireFetchWithoutGlobal,
    setGlobalOptions: setGlobalOptions
};