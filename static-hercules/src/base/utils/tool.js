export const getQuery = function(queryName) {
  let hash = decodeURIComponent(window.location.hash)
  const index = hash.indexOf('?')
  let queryArr = index === -1 ? [] : hash.substring(index + 1).split('&')
  let queryObj = {}
  for (let item of queryArr) {
    let arr = item.split('=')
    queryObj[arr[0]] = arr[1]
  }
  queryObj.__length__ = queryArr.length
  if (queryName) {
    return queryObj[queryName]
  }
  return queryObj
}
const matchEquipment = reg => reg.test(window.navigator.userAgent)
export const isAndroid = () => matchEquipment(/Android/i)
export const isiOS = () => matchEquipment(/ip(hone|od|ad)/i)
export const isWeiXin = () => matchEquipment(/MicroMessenger/i)
export const isAlipay = () => matchEquipment(/AlipayClient/i)

export const getDate = function(str) {
  let date = new Date() //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  date.setTime(str)
  let Y = date.getFullYear()
  let M =
    date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  let D = date.getDate()
  return `${Y}-${M}-${D}`
}
export const getDateTime = function(str) {
  let date = new Date() //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  date.setTime(str)
  let Y = date.getFullYear()
  let M =
    date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  let D = date.getDate()
  let h = date.getHours()
  let m = date.getMinutes()
  let s = date.getSeconds()
  return `${Y}-${M}-${D} ${h}:${m}:${s}`
}
export const getDateMonth = function(str) {
  let date = new Date() //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  date.setTime(str)
  let Y = date.getFullYear()
  let M =
    date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  return `${Y}-${M}`
}

// 是否是在掌柜APP内
export const isRestApp = function() {
  const UA = window.navigator.appVersion
  const isRestApp = Number(UA.indexOf('restapp')) // ios
  const isAnRestApp = Number(UA.indexOf('rest.phonetdfire-Android')) //Android
  return isRestApp >= 0 || isAnRestApp >= 0
}

// 兼容 createAndroidBridge
export const createAndroidBridge = function() {
  if (window.tdfire == null) {
    window.tdfire = {}
  }
  window.tdfire.back = function(_this) {
    let timer = setTimeout(function() {
      if (tdfire.pop) {
        tdfire.pop()
      }
    }, 200)
    _this.$router.afterEach(route => {
      clearTimeout(timer)
    })
    _this.$router.back()
  }

  window.createAndroidBridge = function() {
    if (window.bridge == null) {
      window.bridge = {} // 创建 bridge 对象
    }
    if (window.tdfire.observe == undefined) {
      window.tdfire.observe = function(callback) {
        window.bridge.invoke(
          window.tdfire.getObservePluginSignature(),
          '',
          callback
        )
      }
    }
    if (window.tdfire.umeng == undefined) {
      window.tdfire.umeng = {
        mobclick: function(event) {
          window.bridge.invoke(
            window.tdfire.getUmengPluginSignature(),
            'mobclick',
            null,
            event
          )
        }
      }
    }

    window.bridge.callback = {
      index: 0,
      cache: {},
      invoke: function(id, args) {
        let key = '' + id
        let callbackFunc = window.bridge.callback.cache[key]
        callbackFunc(args)
      }
    }

    window.bridge.invoke = function(pluginName, funcName, callback, ...args) {
      let index = -1
      // 存储 callback
      if (callback !== null && callback !== undefined) {
        window.bridge.callback.index += 1
        index = window.bridge.callback.index
        window.bridge.callback.cache['' + index] = callback
      }
      // 发送消息到 native 去
      window.bridge.postMessage(
        JSON.stringify({
          identifier: pluginName,
          selector: funcName,
          callbackId: index,
          args: args
        })
      )
    }
  }
  if (navigator.userAgent.indexOf('tdfire-Android') > -1) {
    window.createAndroidBridge()
  }
}
// export const openApp = function() {
//   setTimeout(function() {
//     location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=zmsoft.rest.phone'
//   }, 1000)
//   if (isWeiXin() && isiOS()) {
//     // window.location = 'dfire://cloudcash/param'
//   } else {
//     window.location = 'dfire://cloudcash/param'
//   }
// }
