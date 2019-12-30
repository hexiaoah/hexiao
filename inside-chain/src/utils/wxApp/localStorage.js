'use strict';

var _createStorage = require('./createStorage');

var _createStorage2 = _interopRequireDefault(_createStorage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = (0, _createStorage2.default)({
    clear: function clear() {
        wx.clearStorage();
    },
    setItem: function setItem(name, value) {
        wx.setStorageSync(name, value);
    },
    getItem: function getItem(name) {
        var value = wx.getStorageSync(name);
        return value === '' ? null : value;
    },
    removeItem: function removeItem(name) {
        wx.removeStorageSync(name);
    }
});

module.default = module.exports;