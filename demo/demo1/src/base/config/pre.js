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
    NEW_API_BASE_URL: 'https://meal.2dfire-pre.com',
    API_BASE_URL: 'https://open.2dfire-pre.com',
    API_GET_TOKEN_URL:'https://gateway.2dfire.com?app_key=200004&method=',
    SHARE_BASE_URL: 'http://live-pre.zm1717.com',
    IMAGE_BASE_URL: '//ifile.2dfire.com/',
    API_WEB_SOCKET: 'https://websocket.2dfire-pre.com/web_socket',
    // 根据不同环境设置不同domain
    PROJECT_ENV: '2dfire-pre.com',
    // 根据不同环境设置不同Iframe 的 src
    IFRAME_SRC: 'https://d.2dfire-pre.com/newworkorder/page/index.html#/center',
    API_SRC:'https://download.2dfire.com/yardcontent/openapidoc/' + lang + '/openapimain.html',
    SCAN_Env:'pre',
    LANG: lang
};

