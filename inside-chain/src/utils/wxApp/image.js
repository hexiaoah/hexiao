'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by hongpao on 2017/9/26.
 */

/**
 * 关于图片的处理
 * @param options
 *
 */

var imageUtil = function () {
    function imageUtil() {
        _classCallCheck(this, imageUtil);
    }

    _createClass(imageUtil, [{
        key: 'getSuffixName',
        value: function getSuffixName(imageUrl) {

            //图片地址
            imageUrl = imageUrl || '';

            //获取图片地址的后缀名
            var imageUrlAry = imageUrl.split('.');
            var lastIndex = imageUrlAry.length - 1;
            var suffixName = imageUrlAry[lastIndex];

            if (suffixName === 'png') {
                return 'jpg';
            } else {
                return suffixName;
            }
        }
    }, {
        key: 'getRectImageUrl',
        value: function getRectImageUrl(options) {
            options = options || {};

            var imageUrl = options.imageUrl || '';
            var source = options.source || 1; //来源判断(1:H5, 2小程序)
            var defaultImageUrl = 'http://d.2dfire.com/file/images/menulist/default-large.png';
            var rightFlag = true;

            //图片地址协议处理
            if (imageUrl && imageUrl.length > 0) {
                if (imageUrl.substr(0, 5) === 'https') {
                    imageUrl.replace("https:", "");
                } else if (imageUrl.substr(0, 4) === 'http') {
                    imageUrl.replace("http:", "");
                } else {
                    imageUrl = '//' + imageUrl;
                }
            } else {
                rightFlag = false;
            }

            if (rightFlag) {
                var subUrl = '';
                var index = 0;

                //老图片地址的处理
                //http://rest3.zm1717.com/upload_files/00031985/menu/84d4ea26438063fcdf6162b41c79d932.png
                var flagStr = "upload_files";
                if (imageUrl.indexOf(flagStr) > -1) {
                    index = imageUrl.indexOf(flagStr) + flagStr.length + 1;
                    imageUrl = imageUrl.replace("_s", "");
                    subUrl = imageUrl.substring(index, imageUrl.length);
                }

                //新图片地址的处理
                //http://ifile.2dfire.com/00031985/menu/be4c0716b89e47869cc0d4b610d211e4.jpg
                var newFlagStr = ['ifile.2dfire.com', 'ifiletest.2dfire.com', 'file1.2dfire.com'];
                newFlagStr.map(function (item) {
                    if (imageUrl.indexOf(item) > -1) {
                        index = imageUrl.indexOf(item) + item.length + 1;
                        subUrl = imageUrl.substring(index, imageUrl.length);
                    }
                });

                //默认图片的宽高设置
                var width = options.width || 144;
                var height = options.height || 144;

                //有些图片不需要裁剪，要等比缩放
                var h = height !== -1 ? "_" + height + "h" : "";

                // 新增分辨率判断
                var ratio = void 0;
                if (source !== 2) {
                    ratio = window.devicePixelRatio || 2;
                    ratio = ratio === 3 ? 2 : ratio; //降级
                } else {
                    ratio = 2;
                }

                //图片质量
                var quality = options.quality || 80;

                //图片后缀名的判断
                var imgUrlArr = subUrl.split('.');
                var l = imgUrlArr.length;

                //图片后缀名
                var suffixName = options.suffixName || imgUrlArr[l - 1];

                //图片是否支持webp格式
                var isWebpSupport = options.isWebpSupport || false;

                //gif图是否显示动图（默认是）
                var isShowGif = options.isShowGif || true;

                /**
                 * gif图特殊处理（默认动图）
                 * 其他图片判断是否支付webp
                 */
                if (suffixName === 'gif') {
                    if (!isShowGif) {
                        suffixName = isWebpSupport ? 'webp' : 'jpg';
                    }
                } else {
                    suffixName = isWebpSupport ? 'webp' : suffixName;
                }

                //不同环境下的域名地址
                var imageBaseUrl = options.imageBaseUrl || '//ifile.2dfire.com/';

                imageUrl = '' + imageBaseUrl + subUrl + '@1e_' + width + 'w' + h + '_1c_0i_0o_' + quality + 'Q_' + ratio + 'x.' + suffixName;
            }

            //有图片地址，并且格式正确，则返回处理后的图片地址，否则返回默认图片地址；
            if (rightFlag) {
                return imageUrl;
            } else {
                if (source !== 2) {
                    return defaultImageUrl;
                } else {
                    return '';
                }
            }
        }
    }]);

    return imageUtil;
}();

exports.imageUtil = imageUtil;
exports.default = {
    imageUtil: imageUtil
};