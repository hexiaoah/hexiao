/**
 * Created by hupo
 * on 16/10/11.
 *
 * node依赖 :   whatwg_fetch  fetch polyfill 库, 用于发送 fetch/ajax 请求 (https://github.com/github/fetch)
 *
 *  option = {
 *      url: "",                     (必选)
 *      type: "get",
 *      success: callback,           (必选)
 *      error: callback,
 *      isShowLoading: true,         加载动画/统计相关  isShowLoading true/静默调用  false 不调用
 *      params: {},                  请求参数 json格式
 *      data: {},                    post 请求的 data json格式
 *      beforeSend: callback,
 *      contentType: "",             Content-Type
 *      noCookie: false,             Sending cookies 默认发送cookie 只有当 options.noCookie == true 时,可以不发送cookie
 *      timeout: "15000"             node-fetch 特性  不确定是否生效 待测试
 *  }
 *
 *  返回 promise 对象
 */

import 'whatwg-fetch'
var AppUtil = require('./AppUtil');

var DfFetch = function (options) {
    var self = this;
    self.url = "";
    self.method = "get";
    self.timeout = 15000;
    self.config = {
        mode: 'cors',
        cache: 'default'
    };
    self.success = undefined;
    self.error = undefined;
    self.isShowLoading = true;
    self.beforeSend = undefined;

    self.init = function (options) {
        if (typeof options !== "object") {
            throw new Error("options must's object");
        }

        self.url = options.url;
        self.success = options.success;
        self.error = options.error;

        self.url = AppUtil.paramsFormat(self.url, options.params);

        if (options.type != undefined) {
            self.method = options.type;
            self.config.method = self.method
        }
        if (options.contentType) {
            var headers = new Headers();
            headers.append("Content-Type", options.contentType);
            self.config['headers'] = headers;
        }
        if (!AppUtil.isEmpty(options.data)) {
            if (self.method == "get") {
                throw new Error("get method can't send data, please use post method");
            }
            self.config['body'] = JSON.stringify(options.data);
        }
        if (!options.noCookie) {
            self.config['credentials'] = "include";
        }
        if (options.timeout !== undefined) {
            self.timeout = options.timeout;
        }
        if (options.showLoading !== undefined) {
            self.isShowLoading = options.showLoading;
        }
    };

    self.init(options);

    self.checkStatus = function (response) {
        if (response.status >= 200 && response.status < 300) {
            return response.json()
        } else {
            var error = new Error(response.statusText);
            error.response = response;
            throw error
        }
    };

    self.successHandler = function (response) {
        var code = parseInt(response.code);

        if (response.code == 2001) {
            window.location.href = "../page/blacklist.html?t=grunt_page_time";
            return false;
        }

        if (code == -1 || response.code == undefined) {
            if (self.isShowLoading !== false) {
                console.log("show loading")
            }
            if (self.error) {
                var resp = {
                    msg: "接口返回错误",
                    data: response
                };
                self.error(resp);
            }
        } else {
            if (self.success) {
                if (!response.data) {
                    response.data = {};
                }
                self.success(response);
            }
        }
    };

    self.errorHandler = function (response) {
        if (self.isShowLoading) {
            console.log("show loading")
        }
        if (self.error) {
            var resp = {
                msg: response
            };
            self.error(resp);
        }
    };

    self.fetch = function () {
        if (self.isShowLoading) {
            console.log("show loading")
        }

        if (self.beforeSend) {
            self.beforeSend();
        }

        return fetch(self.url, self.config)
            .then(self.checkStatus)
            .then(self.successHandler)
            .catch(self.errorHandler);
    };
};

var dFireFetch = function (options) {
    options.params['token'] = AppUtil.getCookie("token");
    var dfFetch = new DfFetch(options);
    return dfFetch.fetch()
};

module.exports = {
    DfFetch: DfFetch,           // 类
    dFireFetch: dFireFetch      // 实例
};
