'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.defaultStates = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _events = require('events');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var baseOptions = {
    content: '', // 提示内容
    callback: null, // 接口调用结束的回调函数
    level: 'info',
    mask: true,
    visible: false
};

/**
 * 默认状态
 * @type {Object}
 * TODO freeze
 */
var defaultStates = {
    // Alert警告提示
    alert: _extends({}, baseOptions, {
        name: 'alert',
        title: '', // 提示标题
        closeText: '', // 关闭按钮文本
        duration: -1, // 自动关闭的延时，单位毫秒
        showIcon: true,
        iconImage: ''
    }),
    // Toast 弹框
    toast: _extends({}, baseOptions, {
        name: 'toast',
        duration: -1, // 自动关闭的延时，单位毫秒
        showIcon: true,
        iconImage: ''
    }),
    // Message全局提示
    message: _extends({}, baseOptions, {
        name: 'message',
        duration: 3000, // 自动关闭的延时，单位毫秒
        showIcon: true,
        iconImage: '',
        mask: false
    }),
    // Modal对话框
    modal: _extends({}, baseOptions, {
        name: 'modal',
        title: '', // 提示标题
        okText: '确定',
        cancelText: '取消',
        showIcon: true,
        iconImage: ''
    }),
    'share-mask': _extends({}, baseOptions, {
        name: 'share-mask',
        showIcon: true,
        iconImage: ''
    })
};

function getDefaultState(name) {
    return name in defaultStates ? _extends({}, defaultStates[name]) : null;
}

var FeedBackEventEmitter = function (_EventEmitter) {
    _inherits(FeedBackEventEmitter, _EventEmitter);

    function FeedBackEventEmitter() {
        _classCallCheck(this, FeedBackEventEmitter);

        return _possibleConstructorReturn(this, (FeedBackEventEmitter.__proto__ || Object.getPrototypeOf(FeedBackEventEmitter)).apply(this, arguments));
    }

    _createClass(FeedBackEventEmitter, [{
        key: 'show',
        value: function show(name, options) {
            var defaultOptions = getDefaultState(name);
            if (defaultOptions) {
                var showOptions = _extends({}, defaultOptions, {
                    visible: true
                }, options);
                this.emit(name, showOptions);
                this.emit('change', showOptions);
                return showOptions;
            }
        }
    }, {
        key: 'hide',
        value: function hide(name) {
            var defaultOptions = getDefaultState(name);
            if (defaultOptions) {
                var hideOptions = _extends({}, defaultOptions, {
                    visible: false
                });
                this.emit(name, hideOptions);
                this.emit('change', hideOptions);
            }
        }
    }]);

    return FeedBackEventEmitter;
}(_events.EventEmitter);

exports.defaultStates = defaultStates;
exports.default = new FeedBackEventEmitter();