"use strict";

var ajax = function ajax(params) {
    if (!params || !params.url) {
        return;
    }
    function success(resp) {
        params.success && params.success.call(this, resp.data);
    }
    function error(resp) {
        params.error && params.error.call(this, resp.data);
    }
    var paramsFormat = {
        url: params.url,
        method: (params.type || "GET").toUpperCase(),
        data: params.data || "",
        header: {
            'content-type': params.contentType || 'application/json',
            'platform': 'wxapp'
        },
        success: success,
        fail: error,
        complete: params.complete
    };
    wx.request(paramsFormat);
};

module.exports = ajax;