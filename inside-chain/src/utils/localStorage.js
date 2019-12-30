'use strict';

var _createStorage = require('./createStorage');

var _createStorage2 = _interopRequireDefault(_createStorage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var storage = window.localStorage;

module.exports = (0, _createStorage2.default)({
    clear: function clear() {
        storage.clear();
    },
    setItem: function setItem(name, value) {
        storage.setItem(name, value);
    },
    getItem: function getItem(name) {
        return storage.getItem(name);
    },
    removeItem: function removeItem(name) {
        storage.removeItem(name);
    }
});

module.default = module.exports;