import { currentEnvString } from './env'
export const logout = function() {
  if (currentEnvString === 'PRE') {
    location.href = 'https://biz.2dfire-pre.com'
  } else if (currentEnvString === 'PUBLISH') {
    location.href = 'https://biz.2dfire.com'
  } else {
    location.href = location.origin + '/entrance/page/index.html'
  }
}
//跳转到选择店铺页面
export const goToChangePage = function() {
  if(currentEnvString !== "LOCAL" && currentEnvString !== "DEV"){
    if (currentEnvString === 'PRE') {
      location.href = 'https://biz.2dfire-pre.com/page/change.html'
    } else if (currentEnvString === 'PUBLISH') {
      location.href = 'https://biz.2dfire.com/page/change.html'
    } else {
      location.href = location.hostname + '/entrance/page/change.html'
    }
  }
}






