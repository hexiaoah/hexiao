import http from 'base/requester'
import { GW } from '@2dfire/gw-params'
const { GATEWAY_BASE_URL } = require('apiConfig')
function createApi(url, config) {
  const { method = 'post', ...rest } = config || {}
  return params =>
    http[method](
      GATEWAY_BASE_URL + `?method=${url}&app_key=200017&${GW}&`,
      params,
      { emulateJSON: true, ...rest },
      false
    )
}
export default {
  // 助力
  help: createApi('com.dfire.soa.cloudcash.activity.bindPhone'),
  //获取验证码
  getVerCode: createApi('com.dfire.boss.center.soa.authcode.send'),
  //验证验证码
  verifyCCode: createApi('com.dfire.boss.center.soa.authcode.verify'),
  //活动创建
  createActivity: createApi('com.dfire.soa.cloudcash.activity.shareActivity'),
  //分享成功后激活该活动
  activate: createApi('com.dfire.soa.cloudcash.activity.activate'),
  //获取获赠记录
  getHistory: createApi('com.dfire.soa.cloudcash.activity.reward')
}
