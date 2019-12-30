'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.name = exports.hide = exports.show = undefined;

var _utils = require('./utils');

var name = 'share-mask';
var show = (0, _utils.createShow)(name);
var hide = (0, _utils.createHide)(name);

exports.show = show;
exports.hide = hide;
exports.name = name;
exports.default = { show: show, hide: hide, name: name };