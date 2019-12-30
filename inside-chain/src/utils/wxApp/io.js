"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = io;

var _object = require('./object');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventEmitter = require('events');

/**
 * 序列化消息
 * @param  {String} name    事件名称
 * @param  {Any}    payload 数据
 * @return {String}         序列化后的消息
 */
function stringifyMessage(name, payload) {
    return name + (payload ? JSON.stringify(payload) : "");
}

/**
 * 解析服务端传来的message
 * @param  {String} message 服务端传来的message
 *
 * @return {Object}         解析后消息{ name, payload } name: 表示事件名字, payload: 数据
 */
function parseMessage(data) {
    if ((0, _object.isEmpty)(data)) {
        console.log("onSocketMessage: data 不能为空");
        return;
    }

    var result = data.replace("42/web_socket,", "") || "";
    var message = result ? JSON.parse(result) : [];
    // TODO 解析socket.io的message
    if (!message[0]) {
        console.log("onSocketMessage: message 不能为空");
        return;
    }
    return {
        name: message[0] || "",
        payload: typeof message[1] === "string" ? JSON.parse(message[1] || "{}") : message[1]
    };
}

var Io = function () {
    function Io() {
        var _this = this;

        _classCallCheck(this, Io);

        wx.onSocketOpen(function (res) {
            console.log('WebSocket连接已打开！');
            setTimeout(function () {
                _this.eventEmitter.emit('connect', res);
            }, 2000);
            _this.actived = true;
        });
        wx.onSocketError(function (res) {
            console.log('WebSocket连接打开失败，请检查！');
            _this.eventEmitter.emit('connect_error', res);
            _this.actived = false;
        });
        wx.onSocketClose(function (res) {
            console.log('WebSocket 已关闭！');
            _this.eventEmitter.emit('disconnect', res);
            _this.actived = false;
        });
        wx.onSocketMessage(function (res) {
            console.log("res: ", res);
            var data = res.data;
            if (!data) {
                return;
            } else if (data.search("pingInterval") >= 0) {
                return;
            } else if (data === "40") {
                _this.send("40/web_socket");
            } else if (data === "3") {
                return;
            } else if (data === "40/web_socket") {
                clearInterval(_this.intervalIndex);
                _this.intervalIndex = setInterval(function () {
                    _this.send("2");
                }, 25000);
            } else {
                var message = parseMessage(data);
                _this.eventEmitter.emit(message.name, message.payload);
            }
        });
    }

    _createClass(Io, [{
        key: "send",
        value: function send(name, payload) {
            wx.sendSocketMessage({
                data: stringifyMessage(name, payload)
            });
            return this;
        }

        /**
         * 监听事件
         * ！！！注意这里会移除原来所有事件！！！意味着一个事件只有一处监听
         * @param  {String}     eventName   事件名字
         * @param  {Function}   listener    事件处理
         * @return {Io}                     this
         */

    }, {
        key: "on",
        value: function on(eventName, listener) {
            this.removeAll(eventName);
            this.eventEmitter.on(eventName, listener);
            return this;
        }
    }, {
        key: "remove",
        value: function remove(eventName, listener) {
            this.eventEmitter.removeListener(eventName, listener);
            return this;
        }
    }, {
        key: "removeAll",
        value: function removeAll(eventName) {
            this.eventEmitter.removeAllListeners(eventName);
            return this;
        }
    }, {
        key: "once",
        value: function once(eventName, listener) {
            this.eventEmitter.once(eventName, listener);
            return this;
        }
    }, {
        key: "close",
        value: function close() {
            this.actived = false;
            clearInterval(this.intervalIndex);
            wx.closeSocket();
            return this;
        }
    }, {
        key: "connect",
        value: function connect() {
            this.actived = true;
            console.log("io.options: ", this.options);
            console.log("io.url: ", this.url);
            wx.connectSocket({
                url: this.url,
                data: this.options,
                header: {
                    'content-type': 'application/json'
                },
                method: "GET"
            });
            return this;
        }
    }, {
        key: "reopen",
        value: function reopen(url, options) {
            // 清空事件
            this.eventEmitter = new EventEmitter();
            this.url = url;
            this.options = options || {};
            return this.connect();
        }
    }]);

    return Io;
}();

// Io实例，全局只实例一次


var __instance = undefined;

function io(url, options, isNew) {
    if (!__instance) {
        __instance = new Io();
    }

    /**
     * 以下情况时会重新open，会清除之前绑定的事件
     * 1. isNew为true
     * 3. 此次url和现在url不同
     */
    if (isNew || url !== __instance.url) {
        __instance.reopen(url, options);
    } else if (!__instance.actived) {
        /**
         * 以下情况时同时存在时会重新链接，不会清除之前绑定的事件
         * 1. 当前不活跃
         * 2. isNew不为true
         * 3. 此次url和现在url相同
         */
        __instance.connect();
    }

    return __instance;
}