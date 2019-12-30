'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.zipCDNImage = exports.socket = exports.image = exports.globalBasePage = exports.url = exports.validate = exports.router = exports.location = exports.cookie = exports.sessionStorage = exports.Promise = exports.localStorage = exports.Fetch = exports.io = exports.qs = exports.number = exports.object = exports.date = exports.string = exports.array = undefined;

var _array = require('./array');

var _array2 = _interopRequireDefault(_array);

var _string = require('./string');

var _string2 = _interopRequireDefault(_string);

var _date = require('./date');

var _date2 = _interopRequireDefault(_date);

var _object = require('./object');

var _object2 = _interopRequireDefault(_object);

var _number = require('./number');

var _number2 = _interopRequireDefault(_number);

var _qs = require('./qs');

var _qs2 = _interopRequireDefault(_qs);

var _fetch = require('./fetch');

var _fetch2 = _interopRequireDefault(_fetch);

var _localStorage = require('./localStorage');

var _localStorage2 = _interopRequireDefault(_localStorage);

var _io = require('./io');

var _io2 = _interopRequireDefault(_io);

var _sessionStorage = require('./sessionStorage');

var _sessionStorage2 = _interopRequireDefault(_sessionStorage);

var _promise = require('./promise');

var _promise2 = _interopRequireDefault(_promise);

var _cookie = require('./cookie');

var _cookie2 = _interopRequireDefault(_cookie);

var _location = require('./location');

var _location2 = _interopRequireDefault(_location);

var _url = require('./url');

var _url2 = _interopRequireDefault(_url);

var _validate = require('./validate');

var _validate2 = _interopRequireDefault(_validate);

var _router = require('./router');

var _router2 = _interopRequireDefault(_router);

var _globalBasePage = require('./globalBasePage');

var _globalBasePage2 = _interopRequireDefault(_globalBasePage);

var _image = require('./image');

var _image2 = _interopRequireDefault(_image);

var _socket = require('./socket');

var _socket2 = _interopRequireDefault(_socket);

var _zipCDNImage = require('./zipCDNImage');

var _zipCDNImage2 = _interopRequireDefault(_zipCDNImage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.array = _array2.default;
exports.string = _string2.default;
exports.date = _date2.default;
exports.object = _object2.default;
exports.number = _number2.default;
exports.qs = _qs2.default;
exports.io = _io2.default;
exports.Fetch = _fetch2.default;
exports.localStorage = _localStorage2.default;
exports.Promise = _promise2.default;
exports.sessionStorage = _sessionStorage2.default;
exports.cookie = _cookie2.default;
exports.location = _location2.default;
exports.router = _router2.default;
exports.validate = _validate2.default;
exports.url = _url2.default;
exports.globalBasePage = _globalBasePage2.default;
exports.image = _image2.default;
exports.socket = _socket2.default;
exports.zipCDNImage = _zipCDNImage2.default;

var utils = {
    array: _array2.default,
    string: _string2.default,
    date: _date2.default,
    object: _object2.default,
    number: _number2.default,
    qs: _qs2.default,
    io: _io2.default,
    Fetch: _fetch2.default,
    localStorage: _localStorage2.default,
    Promise: _promise2.default,
    sessionStorage: _sessionStorage2.default,
    cookie: _cookie2.default,
    location: _location2.default,
    router: _router2.default,
    validate: _validate2.default,
    url: _url2.default,
    globalBasePage: _globalBasePage2.default,
    image: _image2.default,
    socket: _socket2.default,
    zipCDNImage: _zipCDNImage2.default
};
exports.default = utils;

// web下挂到window下，方便调试

if (typeof window !== 'undefined') {
    window.__DONT_USE_THIS_UTILS = utils;
}
// // web下挂到window下，方便调试
// if (typeof getApp !== 'undefined') {
//     /*global getApp:true*/
//     getApp().__DONT_USE_THIS_UTILS = utils;
// }