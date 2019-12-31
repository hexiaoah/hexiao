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
    API_BASE_URL: 'https://open.2dfire.com',
    NEW_API_BASE_URL: 'http://activity.zm1717.com',
    API_GET_TOKEN_URL:'https://gateway.2dfire.com?app_key=200004&method=',
    SHARE_BASE_URL: 'http://live.zm1717.com',
    IMAGE_BASE_URL: '//ifile.2dfire.com/',
    API_WEB_SOCKET: 'https://websocket.2dfire.com/web_socket',
    // 根据不同环境设置不同domain
    PROJECT_ENV: '2dfire.com',
    // 根据不同环境设置不同Iframe 的 src
    IFRAME_SRC: 'https://d.2dfire.com/newworkorder/page/index.html#/center',
    API_SRC:'https://download.2dfire.com/yardcontent/openapidoc/' + lang + '/openapimain.html',
    SCAN_Env:'publish',
    LANG: lang
};
