export const isUndefined = value => typeof value === 'undefined'
export const isNull = value => Object.prototype.toString.call(value) === '[object Null]'
export const isNumber = value => Object.prototype.toString.call(value) === '[object Number]'
export const isString = value => Object.prototype.toString.call(value) === '[object String]'
export const isFunction = value => Object.prototype.toString.call(value) === '[object Function]'
export const isArray = value => Object.prototype.toString.call(value) === '[object Array]'
export const isArrayAndEmpty = value => isArray(value) && value.length === 0
export const isObject = value => Object.prototype.toString.call(value) === '[object Object]'
export const isObjectAndEmpty = value => isObject(value) && Object.keys(value).length === 0


/**
 * 返回第一个符合要求的元素的 index，若没有，返回 -1
 */
export function indexOf(array, condition) {
    for (let i = 0; i < array.length; i += 1) {
        if (condition(array[i])) return i
    }
    return -1
}


/**
 * 返回最后一个符合要求的元素的 index，若没有，返回 -1
 */
export function lastIndexOf(array, condition) {
    for (let i = array.length - 1; i > -1; i -= 1) {
        if (condition(array[i])) return i
    }
    return -1
}


/**
 * 返回数组中有多少个元素符合要求
 */
export function count(array, condition) {
    return array.filter(condition).length
}


/**
 * 返回 iterator 的第一个元素
 * - iterator 可以是数组、Map、Set...
 * - 若指定了 filter，则返回第一个符合要求的元素
 * - iterator 为空或没有符合要求的元素时，返回 defaultValue
 */
export function first(iterator, filter = () => true, defaultValue = undefined) {
    for (const value of iterator) {
        if (filter(value)) return value
    }
    return defaultValue
}


/**
 * 把 object 中的指定 key 提取成新对象
 */
export function pick(obj, ...keys) {
    const result = {}
    keys.forEach(key => {
        if (obj && key in obj) result[key] = obj[key]
    })
    return result
}


/**
 * 排除指定 keys，返回新对象
 */
export function omit(obj, ...keys) {
    const result = { ...obj }
    keys.forEach(key => delete result[key])
    return result
}


/**
 * 生成 min、max 之间的随机整数（包含 min 和 max）
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#Getting_a_random_integer_between_two_values_inclusive
 */
export function randint(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}


/**
 * 生成指定长度的随机字符串
 */
export function randstr(len = 16, seed = null) {
    if (!seed) seed = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_'.split('')
    let result = ''
    while (result.length < len) {
        const letterIdx = randint(0, seed.length - 1)
        result += seed[letterIdx]
    }
    return result
}


/**
 * 生成一个 mirror object
 * mirror(['a', 'b', 'c']) => { a: 'a', b: 'b', c: 'c' }
 * mirror('prefix/', ['a', 'b', 'c']) => { a: 'prefix/a', b: 'prefix/b', c: 'prefix/c' }
 */
export function mirror(prefix, keys) {
    if (!keys) {
        keys = prefix
        prefix = null
    }
    return arr2obj(keys, key => [key, prefix ? prefix + key : key])
}


/**
 * 把一个数组转换成 object
 * callback: item => [key, value]
 */
export function arr2obj(array, callback) {
    const obj = {}
    array.forEach((item, i) => {
        const [key, value] = callback(item, i)
        obj[key] = value
    })
    return obj
}


/**
 * 判断 value 是否与 compares 的其中某个值全等
 */
export function oneOf(value, ...compares) {
    for (let i = 0; i < compares.length; i += 1) {
        if (value === compares[i]) return true
    }
    return false
}
