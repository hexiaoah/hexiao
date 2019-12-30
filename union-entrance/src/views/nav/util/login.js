import getEnv from './getEnv'
import ajax from './ajax'
import cookie from './cookie'
const env = getEnv()
import modal from '../modal'
import tool from './tool'

const pathname = tool.getPathKey()
const APP_KEY = 200800

const goToLogin = function() {
  const url = {
    local: 'http://localhost:8070/page/index.html',
    dev: `http://tt.2dfire.net/${pathname}/entrance/page/index.html`,
    daily: 'http://d.2dfire-daily.com/entrance/page/index.html',
    pre: 'https://biz.2dfire-pre.com',
    publish: 'https://biz.2dfire.com'
  }[env]
  window.location.href = url + '?flag=timeout'
}
const logout = function() {
  const url = {
    local: `http://gateway.2dfire-daily.com/?app_key=${APP_KEY}&method=`,
    dev: `http://gateway.2dfire-daily.com/?app_key=${APP_KEY}&method=`,
    daily: `http://gateway.2dfire-daily.com/?app_key=${APP_KEY} &method=`,
    pre: `https://gateway.2dfire-pre.com/?app_key=${APP_KEY}&method=`,
    publish: `https://gateway.2dfire.com/?app_key=${APP_KEY}&method=`
  }[env]

  ajax({
    url: url + 'com.dfire.boss.center.pc.ILoginBossPcService.logout',
    type: 'POST',
    data: {},
    dataType: 'json',
    success: function(response) {
      // 此处放成功后执行的代码
      let data = JSON.parse(response)
      if (
        (data.code === 1 && data.data.data) ||
        (data.code === 0 && data.errorCode === 'ERR_PUB200002')
      ) {
        sessionStorage.clear()
        cookie.clearCookies()
        modal.message('退出成功')
        setTimeout(function() {
          goToLogin()
        }, 0)
      }
    },
    fail: function() {
      modal.message('退出失败')
    }
  })
}
//跳转到切换店铺页
const goToShiftShop = function() {
  window.location.href = {
    local: 'http://localhost:8070/page/change.html',
    dev: `http://tt.2dfire.net/${pathname}/entrance/page/change.html`,
    daily: 'http://d.2dfire-daily.com/entrance/page/change.html',
    pre: 'https://biz.2dfire-pre.com/page/change.html',
    publish: 'https://biz.2dfire.com/page/change.html'
    // publish: 'https://biz.2dfire.com/entrance/page/change.html'
  }[env]
}
export default {
  goToLogin,
  logout,
  goToShiftShop
}
