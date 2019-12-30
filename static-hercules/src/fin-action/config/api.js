/**
 * 金融支付活动模块API
 */

import axios from './interception'

export const getToken = params =>
  axios({
    method: 'GET',
    url: 'com.dfire.soa.sso.ISessionManagerService.validateServiceTicket',
    params: params
  })
/*
 * 获取活动配置列表
 */
export const getActivityList = params =>
  axios({
    method: 'GET',
    url: 'com.dfire.fin.activity.banner.queryPublished',
    params
  })
