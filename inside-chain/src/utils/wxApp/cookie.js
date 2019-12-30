'use strict';

var _createStorage = require('./createStorage');

var _createStorage2 = _interopRequireDefault(_createStorage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var values = {}; /**
                  * 小程序设置假cookie数据
                  */

module.exports = (0, _createStorage2.default)({
    clear: function clear() {
        values = {};
    },
    getAll: function getAll() {
        return values;
    },
    setItem: function setItem(name, value) {
        values[name] = value;
    },
    getItem: function getItem(name) {
        return values[name];
    },
    removeItem: function removeItem(name) {
        if (name in values) {
            delete values[name];
        }
    }
});

module.default = module.exports;