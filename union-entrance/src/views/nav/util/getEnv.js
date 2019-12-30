let env = null

/**
 * 判断环境
 */
export default function getEnv() {
  if (env) {
    return env
  }

  const hostname = window.location.hostname
  const devHostList = ['tt.2dfire.net']
  const dailyHostList = ['d.2dfire-daily.com', 'biz.2dfire-daily.com']
  const preHostList = [
    'd.2dfire-pre.com',
    'biz.2dfire-pre.com',
    'shoppingmall.2dfire-pre.com'
  ]
  const publishHostList = ['biz.2dfire.com', 'd.2dfire.com']

  if (devHostList.includes(hostname)) {
    env = 'dev'
  } else if (dailyHostList.includes(hostname)) {
    env = 'daily'
  } else if (preHostList.includes(hostname)) {
    env = 'pre'
  } else if (publishHostList.includes(hostname)) {
    env = 'publish'
  } else {
    env = 'local'
  }

  return env
}
