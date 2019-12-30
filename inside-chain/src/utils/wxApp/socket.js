'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setSocketGlobalOptions = setSocketGlobalOptions;
exports.enterSocketRoom = enterSocketRoom;

var _io = require('./io');

var _io2 = _interopRequireDefault(_io);

var _object = require('./object');

var _url = require('./url');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var socketGlobalOptions = {
    /**
     * 全局获取url方法
     * @return url
     */
    getBaseUrl: function getBaseUrl() {
        return '';
    },

    getDefaultRoom: function getDefaultRoom() {
        return {};
    }
};

/**
 * 设置全局会话超时处理
 * @param {Function} sessionOutHandler
 */
function setSocketGlobalOptions(options) {
    (0, _object.objectAssign)(socketGlobalOptions, options);
}

/**
 * 根据room链接socket。如果没有room参数，默认进入全局默认房间
 * TODO 之后支持多房间
 * @param  {Object} room 需要链接房间
 * @return {Io}          socket实例
 */
function enterSocketRoom(room) {
    room = room || socketGlobalOptions.getDefaultRoom();

    var url = (0, _url.createUrl)(socketGlobalOptions.getBaseUrl(), room);
    return (0, _io2.default)(url, {}, false);
}

exports.default = {
    setSocketGlobalOptions: setSocketGlobalOptions,
    enterSocketRoom: enterSocketRoom
};