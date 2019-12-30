'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.globalBasePage = exports.blink = exports.hideInfo = exports.showInfo = exports.isLoading = exports.stopLoading = exports.startLoading = exports.cm = exports.message = exports.waitTime = exports.type = exports.PAGE_TYPES = undefined;

var _feedBackAuto = require('@2dfire/feed-back-auto');

function baseTimeCountDown(second, everyOnceF, endF) {
    second--;
    var t = setInterval(function () {
        if (second < 1) {
            clearInterval(t);
            endF();
        }
        everyOnceF(second);
        second--;
    }, 1000);
}

var PAGE_TYPES = {
    confirm: '0',
    info: '1',
    warn: '2',
    error: '3',
    cartIsSubmitChange: '4',
    cartIsSubmit: '5',
    sessionOut: '6', //授权过期
    orderOut: '7', //订单过期，或者已经结单
    frost: '8', //服务令禁用,
    failed: '9'
};

var type = PAGE_TYPES;

// TODO 会被设置否？by 炒饭
var waitTime = 3;
var message = {
    error: '小二七手八脚的把事情搞砸了'
};

var cm = {
    cartTimeOut: '您太久没有操作啦，我们找不到您的点餐数据啦',
    cartSubmit: '您的朋友已经下单啦，快去看看吧'
};

function startLoading(options) {
    var content = options && options.content ? options.content : '';
    _feedBackAuto.toast.loading({ content: content, duration: -1 });
}

function stopLoading() {
    _feedBackAuto.toast.hide();
}

// loading 是否正在显示 true 在显示, false 没有在显示
function isLoading() {
    // 这个方法应该被废除, 待定
    return false;
    // return $('#fbaij_toast').length > 0;
}

function showInfo(type, options) {
    if (type === PAGE_TYPES.confirm) {
        _feedBackAuto.modal.info({
            content: options.message,
            okText: options.okBtnText || '确定',
            cancelText: options.cancelBtnText || '取消'
        }, function (res) {
            if (res.ok && options.callback) {
                options.callback();
            }
        });
    } else if (type == PAGE_TYPES.error) {
        _feedBackAuto.alert.error({
            content: options.errorMessage || '小二七手八脚的把事情搞砸了',
            closeText: options.btnText || '重新获取',
            showIcon: true,
            duration: -1
        }, function (res) {
            if (res.close && options.reload) {
                options.reload();
            }
        });
    } else if (type == PAGE_TYPES.failed) {
        _feedBackAuto.alert.error({
            content: options.errorMessage || '小二七手八脚的把事情搞砸了',
            closeText: options.btnText || '我知道了',
            showIcon: true,
            duration: -1
        }, function (res) {
            if (res.close && options.callback) {
                options.callback();
            }
        });
    } else if (type == PAGE_TYPES.warn) {
        _feedBackAuto.alert.warning({
            content: options.warnMessage,
            closeText: '',
            showIcon: true,
            duration: 2000
        });
    } else if (type == PAGE_TYPES.info) {
        _feedBackAuto.alert.info({
            content: options.infoMessage,
            closeText: '',
            showIcon: true,
            duration: 2000
        });
    } else if (type == PAGE_TYPES.cartIsSubmitChange) {
        _feedBackAuto.alert.error({
            title: '购物车有变动',
            content: '变化部分已经用红色字体标注',
            closeText: '',
            showIcon: false,
            duration: 2000
        });
    } else if (type == PAGE_TYPES.cartIsSubmit) {
        var title = options.message || '您的朋友已提交本桌订单';
        _feedBackAuto.alert.error({
            title: title,
            content: '<i>' + waitTime + '</i>秒后进入下单的菜页面',
            closeText: '',
            showIcon: false,
            duration: -1
        });

        baseTimeCountDown(waitTime, function (s) {
            _feedBackAuto.alert.error({
                title: title,
                content: s + '秒后进入下单的菜页面',
                closeText: '',
                showIcon: false,
                duration: -1
            });
        }, function () {
            if (options.callback) {
                options.callback();
            }
        }, true);
    } else if (type == PAGE_TYPES.sessionOut) {
        _feedBackAuto.alert.error({
            title: '您太久没有动静了',
            content: '请重新扫码',
            closeText: '',
            showIcon: false,
            duration: -1
        });
    } else if (type == PAGE_TYPES.orderOut) {
        _feedBackAuto.alert.error({
            title: '这张点菜单已经结账完毕啦',
            content: '请重新扫码',
            closeText: '',
            showIcon: false,
            duration: -1
        });
    } else if (type == PAGE_TYPES.frost) {
        _feedBackAuto.alert.error({
            title: options.frostTitle,
            content: options.frostMessage,
            closeText: '',
            showIcon: false,
            duration: 2000
        });
    }
}
function hideInfo() {
    // 这个方法应该被废除, 待定
    _feedBackAuto.alert.hide();
}

function blink() {
    // 这个方法应该被废除, 待定
    return false;
}

var globalBasePage = {
    PAGE_TYPES: PAGE_TYPES,
    type: type,
    waitTime: waitTime,
    message: message,
    cm: cm,
    startLoading: startLoading,
    stopLoading: stopLoading,
    isLoading: isLoading,
    showInfo: showInfo,
    hideInfo: hideInfo,
    blink: blink
};

exports.PAGE_TYPES = PAGE_TYPES;
exports.type = type;
exports.waitTime = waitTime;
exports.message = message;
exports.cm = cm;
exports.startLoading = startLoading;
exports.stopLoading = stopLoading;
exports.isLoading = isLoading;
exports.showInfo = showInfo;
exports.hideInfo = hideInfo;
exports.blink = blink;
exports.globalBasePage = globalBasePage;
exports.default = globalBasePage;