/**
 * Created by zyj on 2017/12/20.
 */
const { API_BASE_URL } = require('apiConfig');

module.exports = {
  // 获取掌柜端app的最新版本
  QUERY_CARD_STATUS: API_BASE_URL + '/enterprise/card/apply/query_card_status',
  // 获取最新安卓版的二维火APP下载链接
  NEWEST_ANDROID_URL: API_BASE_URL + '/sales/stack_base/app_latest_version'
}