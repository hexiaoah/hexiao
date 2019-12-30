import defaultConfig from './defaultConfig'
import createNav from './navBar'
import util from './util'

const init = function(config) {
  const { loginType, userInfo } = util.getCookie('entrance')
  // entrance 数据不全，跳转登录页面
  if ((!loginType || !userInfo) && util.getEnv() !== 'local') {
    return util.goToLogin()
  }
  config = Object.assign(defaultConfig, config)
  //创建顶部导航栏
  createNav(config)
  //创建其他
}

export default { init }
