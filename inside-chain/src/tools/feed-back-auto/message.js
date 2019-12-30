'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hide = exports.loading = exports.warn = exports.warning = exports.success = exports.error = exports.info = undefined;

var _utils = require('./utils');

var type = 'message';
var info = (0, _utils.createShowWithLevel)(type, 'info');
var warning = (0, _utils.createShowWithLevel)(type, 'warning');
var warn = warning;
var error = (0, _utils.createShowWithLevel)(type, 'error');
var success = (0, _utils.createShowWithLevel)(type, 'success');
var loading = (0, _utils.createShowWithLevel)(type, 'loading');
var hide = (0, _utils.createHide)(type);

exports.info = info;
exports.error = error;
exports.success = success;
exports.warning = warning;
exports.warn = warn;
exports.loading = loading;
exports.hide = hide;
exports.default = { info: info, error: error, success: success, warning: warning, warn: warn, loading: loading, hide: hide };