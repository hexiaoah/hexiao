'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = createStorage;
function toJSONString(value) {
    return JSON.stringify(value);
}

function parseJSONString(value) {
    return JSON.parse(value);
}

function toString(name) {
    return '' + name;
}

/**
 * 创建一个storage，对set，get进行包装
 * - setItem、getItem、set、get、remove参数name转化为字符串
 * - setItem参数name进行JSON.stringify
 * - set参数value进行JSON.stringify
 * - get返回值自动JSON.parse
 *
 * @param  {Object} realStorage 实际storage,需要包含:setItem、getItem、removeItem、clear方法
 * @return {Object}             包装后的storage,包含:setItem、getItem、removeItem、set、get、clear方法
 * @example
 *
 * let values = {};
 * storage = createStorage({
 *     clear() {
 *         values = {};
 *     },
 *     set(name, value) {
 *         values[name] = value;
 *     },
 *     get(name) {
 *         return values[name];
 *     },
 *     remove(name) {
 *         if (name in values) {
 *             delete values[name];
 *         }
 *     }
 * });
 *
 * storage.set('coolName', { a: 'booo' }); // values: { a: '"booo"'}
 * // 和原生Storage(e.g. localStorage) getItem一致
 * storage.getItem('coolName'); // String: '{"a":"booo"}'
 * // 将通过JSON.parse转化为对象,如果回去到的值不为JSON字符串，则throw Uncaught SyntaxError
 * storage.get('coolName'); // Object: { a: 'booo' }
 *
 * storage.setItem('coolName', { a: 'booo' }); // 和原生Storage(e.g. localStorage) setItem一致
 * storage.getItem('coolName'); // String: '[object Object]'
 * storage.get('coolName'); // throw Uncaught SyntaxError
 *
 * storage.getItem('unsetName'); // null 这里和原生Storage的getItem一致，原生返回null
 *
 * 推荐：在已知类型情况下，使用set和get。如果未知类型，可能为其它地方直接设置，
 * 请使用setItem、getItem，来设置获取字符串
 */
function createStorage(realStorage) {
    /**
     * 将属性设置到storage
     * @param  {String} name  属性名字
     * @param  {String} value 属性值
     * @param  {Object} args  其它参数,主要cookie使用
     * @return {void}
     */

    function setItem(name, value) {
        for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
            args[_key - 2] = arguments[_key];
        }

        realStorage.setItem.apply(realStorage, [toString(name), toString(value)].concat(args));
    }

    /**
     * 从storage获取属性
     * @param  {String} name 需要取的属性名字
     * @param  {Object} args 其它参数,主要cookie使用
     * @return {String|null}      取到的值
     */

    function getItem(name) {
        for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            args[_key2 - 1] = arguments[_key2];
        }

        var value = realStorage.getItem.apply(realStorage, [toString(name)].concat(args));
        if (value === undefined) {
            return null;
        }
        return value;
    }

    /**
     * 从storage获取全部
     * @return {String|null}      所有值
     */

    function getAll() {
        var value = realStorage.getAll();
        if (value === undefined) {
            return null;
        }
        return value;
    }
    return {
        setItem: setItem,
        getItem: getItem,
        getAll: getAll,

        /**
         * 将属性设置到storage,设置前JSON.stringify
         * @param  {String} name  属性名字
         * @param  {Any}    value 属性值
         * @param  {}       args  其它参数
         * @return {void}
         */

        set: function set(name, value) {
            for (var _len3 = arguments.length, args = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
                args[_key3 - 2] = arguments[_key3];
            }

            setItem.apply(undefined, [name, toJSONString(value)].concat(args));
        },


        /**
         * 从storage获取属性，并且JSON.parse
         * @param  {String} name 需要取的属性名字
         * @param  {}       args 其它参数
         * @return {Any}         转化后的值
         * @throws {SyntaxError} 当获取的字符串不是JSON支付串时
         */

        get: function get(name) {
            for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
                args[_key4 - 1] = arguments[_key4];
            }

            var value = getItem.apply(undefined, [name].concat(args));
            return value === null ? null : parseJSONString(value);
        },


        /**
         * 从storage移除属性
         * @param  {String} name 需要移除的属性名字
         * @param  {}       args 其它参数
         * @return {void}
         */

        removeItem: function removeItem(name) {
            for (var _len5 = arguments.length, args = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
                args[_key5 - 1] = arguments[_key5];
            }

            realStorage.removeItem.apply(realStorage, [toString(name)].concat(args));
        },


        /**
         * 清空storage
         * @param  {}       args 其它参数
         * @return {void}
         */
        clear: realStorage.clear
    };
}