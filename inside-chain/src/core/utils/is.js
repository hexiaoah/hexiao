function isOO(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}
export function isObj(obj) {
  return obj !== null && typeof obj === 'object' && !isArr(obj)
}
export function isPlainObj(obj) {
  if (!isOO(obj)) return false
  let ctor = obj.constructor
  if (!isFunc(ctor)) return false
  let prot = ctor.prototype
  if (!isOO(prot)) return false
  return prot.hasOwnProperty('isPrototypeOf')
}
export function isFunc(obj) {
  return typeof obj === 'function'
}
export function isNum(value, isStrict) {
  if (!isStrict) {
    value = +value
  }
  return typeof value === 'number' && value - value + 1 === 1
}
export function isStr(obj) {
  return typeof obj === 'string'
}
export function isBool(obj) {
  return typeof obj === 'boolean'
}
export function isArr(obj) {
  return Array.isArray(obj)
}
export function isUNN(obj) {
  return obj === null || obj === undefined || Number.isNaN(obj)
}
export function isEmptyObj(obj) {
  for (let key in obj) {
    return false
  }
  return true
}
export function isEmptyArr(obj) {
  return isArr(obj) && obj.length === 0
}
export function isPromise(obj) {
  return isFunc(obj) && obj.then
}
