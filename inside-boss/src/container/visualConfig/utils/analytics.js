/*
2019/05/11 @fengtang

埋点/统计工具
参考：static-file/js/analytics.1.1.2.js

日志查看： https://kibana.2dfire.net
index 选 'trace-*'

字段（Fields）里的 'param_xxx' 对应于此脚本提交上去的 xxx 参数（不区分大小写）
例如 param_m 对应于 M
*/


const Analytics = {}

// 当前是否处于线上环境
const isPublish = window.location.hostname === 'biz.2dfire.com'

// 上报埋点日志的 URL
// 只在线上环境实际上报日志；其他环境向一个虚拟地址上报日志，仅用于测试埋点上报是否正常
const logBaseURL = isPublish
    ? '//trace.2dfire.com/0.gif'
    : '//cdn.2dfire.com/file/images/trace/0.gif'


// ========== 基础功能 - 日志上报 ==========

// 日志类型
const logTypes = {
    error: true,         // 错误
    warning: true,       // 警告
    normal: true,        // 普通信息
}


// 发送埋点日志
Analytics.send = (options) => {
    // 设个 setTimeout，保证发送埋点时万一有异常不会影响业务代码
    setTimeout(() => Analytics.sendImmediately(options), 0)
}


/*
发送埋点日志（一般不应直接调用此函数，应调用 Analytics.send() ）

options: {
    name    string  埋点名称。必填
    type    string  信息类型，必须是 logTypes 里的值之一，默认为 normal。
    data    any     要提交的信息，支持任意数据类型。
                    对于 Object 和 Array，会转成 JSON 字符串；对于其他类型，会进行普通的 string 化
    params  object  要在上报信息时额外附加的参数。所有参数可在 kibana 里以 param_xxx 的名称查看。
                    例如上报了 params: { foo: 'bar' }，这条日志在 kibana 上查看时就能看到 param_foo 字段值等于 bar
}
*/
Analytics.sendImmediately = (options) => {
    const { name, type = 'normal', data = '', params = {} } = options
    if (!name || !type || !params) throw new Error('参数不合法，埋点信息上报失败')
    if (!logTypes[type]) throw new Error(`未定义的日志类型: ${type}`)

    const dataString = formatData(data)
    const rand = (new Date().getTime() + Math.ceil(Math.random() * 1000)).toString(36)

    const query = Object.assign({
        // 标记是 inside-boss 相关的日志
        boss: 1,

        // 这里兼容了老项目的日志格式
        // T: 日志类型; M: 日志信息; A: 附加的日志信息; U: 日志相关页面 URL; V: 随机字符串，防止缓存
        T: { error: 'Er', warning: 'Wa', normal: 'Nm' }[type],
        M: name,
        A: dataString,
        U: window.location.href,
        V: rand,

        ...params,
    })
    const queryString = Object.keys(query).map(key => `${key}=${encodeURIComponent(query[key])}`).join('&')
    const logURL = `${logBaseURL}?${queryString}`

    // TODO: 以后考虑支持小程序（域名添加到“安全域名”，然后通过 AJAX 请求上报？）
    let img = new Image()
    img.onload = img.onerror = e => { img = null }  // 请求完成后清除
    img.src = logURL

    if (!isPublish) {
        // 方便开发时查看埋点信息
        console.log('Analytics', query)
    }
}

// 把 data 转换成字符串
function formatData(data) {
    const type = Object.prototype.toString.call(data)
    if (type === '[object Object]' || type === '[object Array]') {
        try {
            return JSON.stringify(data)
        } catch (e) {
            throw new Error(`data JSON 化失败：${e.toString()}`)
        }
    } else {
        return String(data)
    }
}


export default Analytics
