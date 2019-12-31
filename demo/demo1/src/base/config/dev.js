function getLang() {
    var browserLang = (navigator.language || navigator.browserLanguage).toLowerCase();
    if (browserLang.indexOf('zh') > -1)
        return 'cn';
    else if (browserLang.indexOf('en') > -1)
        return 'en';
    else
        return 'en';
}

var lang = getLang();

module.exports = {
    NEW_API_BASE_URL: '../../api',
    API_BASE_URL: '../../api',
    API_GET_TOKEN_URL:'http://gateway.2dfire-daily.com?app_key=200004&method=',
    // API_AUTH_PHONE:'../../authApi',
    SHARE_BASE_URL: 'http://api.l.whereask.com',
    IMAGE_BASE_URL: 'http://ifiletest.2dfire.com/',
    API_WEB_SOCKET: 'http://10.1.5.114:9003/web_socket',
    MOCK_BASE_URL: 'http://mock.2dfire-daily.com/mockjsdata/7',
    // 根据不同环境设置不同domain
    PROJECT_ENV: 'whereask.com',
    // 根据不同环境设置不同Iframe 的 src
    IFRAME_SRC: 'http://api.l.whereask.com/develop_workorderH/newworkorder/page/index.html#/center',
    API_SRC:'http://download.2dfire.com/yardcontent/openapidoc/' + lang + '/openapimain.html',
    SCAN_Env:'',
    LANG: lang
};
