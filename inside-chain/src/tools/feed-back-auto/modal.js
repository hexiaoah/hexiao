'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.hide = exports.alert = exports.confirm = exports.warn = exports.warning = exports.success = exports.error = exports.info = undefined;

var _utils = require('./utils');

var type = 'modal';
var info = (0, _utils.createShowWithLevel)(type, 'info');
var warning = (0, _utils.createShowWithLevel)(type, 'warning');
var warn = warning;
var error = (0, _utils.createShowWithLevel)(type, 'error');
var success = (0, _utils.createShowWithLevel)(type, 'success');

// 两个按钮 alias info
var confirm = info;

// 一个按钮
var alert = (0, _utils.createShow)(type, {
    level: 'info',
    cancelText: ''
});

// 隐藏
var hide = (0, _utils.createHide)(type);

exports.info = info;
exports.error = error;
exports.success = success;
exports.warning = warning;
exports.warn = warn;
exports.confirm = confirm;
exports.alert = alert;
exports.hide = hide;
exports.default = { info: info, error: error, success: success, warning: warning, warn: warn, confirm: confirm, alert: alert, hide: hide };