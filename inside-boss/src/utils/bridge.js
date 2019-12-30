import { hashHistory } from 'react-router'
import getUserInfo from './getUserInfo'
// import cookie from '@2dfire/utils/cookie'
import { logout } from './jump'

/**
 * 从 iframe 取参数集合
 * @returns {object}
 */
export function getParamsObject() {
  const { query } = hashHistory.getCurrentLocation()
  return query || {}
}
export function getInfoAsQuery() {
  const { shopInfo, userInfo, token } = getUserInfo()
  const { name, ...rest } = userInfo || {}
  return {
    ...shopInfo,
    ...rest,
    currVer: 17,
    token,
    userName: name
  }
}

/**
 * 从 iframe 取某个参数
 * @param {string} key
 * @returns {*|undefined}
 */
export function getParam(key) {
  const { query } = hashHistory.getCurrentLocation()
  return query.hasOwnProperty(key) ? query.key : undefined
}

export function callParent(method) {
  let key = 'INSIDEBOSS:'
  let origin = '*'

  switch (method || 'test') {
    case 'logout':
      logout()
      key += 'LOGOUT'
      break

    case 'TEST':
      key += 'TEST'
      break

    default:
      break
  }

  parent.top.window.postMessage(key, origin)
}
