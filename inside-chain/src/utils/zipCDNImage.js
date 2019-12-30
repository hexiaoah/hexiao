'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getGlobalOptions = exports.setGlobalOptions = undefined;

var _image = require('./image');

var _object = require('./object');

var globalOptions = {};

/**
 * 设置全局配置，options会被assign进globaOptions
 * @param {Object} options  extendGlobalOptions
 */
function setGlobalOptions(options) {
    (0, _object.objectAssign)(globalOptions, options);
}

/**
 * 获取全局配置
 * @return {Object}     globalOptions
 */
function getGlobalOptions() {
    return globalOptions;
}

// 初始化new一下（可放在循环外）
var image = new _image.imageUtil();

/**
 * 获取压缩后的cdn图片地址
 * @param  {String} imageUrl 图片地址
 * @param  {Object} options  配置
 * @return {String}          压缩后的图片地址
 *
 * e.g.
 *  zipCDNImage(imageUrl, {
 *     width: 355,
 *     height: 221,
 *  })
 */
function zipCDNImage(imageUrl, options) {
    return image.getRectImageUrl((0, _object.objectAssign)({
        suffixName: image.getSuffixName(imageUrl),
        imageUrl: imageUrl
    }, globalOptions, options));
}

exports.setGlobalOptions = setGlobalOptions;
exports.getGlobalOptions = getGlobalOptions;
exports.default = zipCDNImage;