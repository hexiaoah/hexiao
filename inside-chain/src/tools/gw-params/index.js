/**
 * created by Zeqi at 2018-04-08
 * version 0.0.1
 * 获取网关PC端请求需要的参数，返回形式为字符串
 * 例如：
 *  "s_os=Mac%20OS&s_osv=10.12.6&s_ep=Chrome&s_epv=65.0.3325.181&s_sc=1280*324&timestamp=1523176879447&s_web=1&v=1.0&format=json"
 *
 */

var parser = require('ua-parser-js');

var gw = function setGwParams(){

        var params = {
            // 系统名称
            s_os: 'osx',
            // 系统版本
            s_osv: '10.1',
            // 浏览器名称
            s_ep: 'chrome',
            // 浏览器版本
            s_epv: '64',
            // 窗口尺寸
            s_sc: '800*600',
            // 时间戳
            timestamp: '0',
            // 是否开启web端访问 1:开启
            s_web: '1',
            // api版本，允许值1.0
            v: '1.0',
            // 返回数据格式，允许'json'，'xml'
            format: 'json'
        }

        var up = new parser()

        // get OS's name & OS's version
        var os = up.getOS();
        params.s_os = os.name;
        params.s_osv = os.version;

        // get browser's name & browser's version
        var browser = up.getBrowser();
        params.s_ep = browser.name;
        params.s_epv = browser.version;

        // get clientHeight & clientWidth
        var c_height = document.documentElement.clientHeight.toString();
        var c_width = document.documentElement.clientWidth.toString();
        params.s_sc = c_width + '*' + c_height;

        // set timestamp
        var date = new Date();
        params.timestamp = date.getTime();

        var true_params = "s_os=" + params.s_os +
            "&s_osv=" + params.s_osv +
            "&s_ep=" + params.s_ep +
            "&s_epv=" + params.s_epv +
            "&s_sc=" + params.s_sc +
            "&timestamp=" + params.timestamp +
            "&s_web=1&v=1.0&format=json";

        return true_params


}

module.exports = {
    GW: gw()
}