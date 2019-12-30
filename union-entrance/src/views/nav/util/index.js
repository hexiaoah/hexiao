import login from './login'
import ajax from './ajax'
import cookie from './cookie'
import getEnv from './getEnv'
import tool from './tool'

const getDom = function(selector, isAll) {
  return document[isAll ? 'querySelectorAll' : 'querySelector'](selector)
}
export default {
  ...login,
  ...cookie,
  ajax,
  getEnv,
  getDom,
  ...tool
}
