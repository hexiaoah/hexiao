/**
 * @param {boolean} flag 表示是否是退出登录的的时候
 */
function getPathKey() {
  let pathname = location.pathname.split('/')[1]
  // const len = {
  //   entrance: 8,
  //   insideboss: 10,
  //   supplychain: 11,
  //   shoppingmall: 12,
  //   setting: 7,
  //   shoppingmall_crm: 16
  // }[pathname.substring(0, pathname.indexOf('_'))]
  // if (len) {
  //   pathname = flag ? pathname.substring(0, len) : pathname.substring(len + 1)
  // }
  return pathname
}
export default {
  getPathKey
}
