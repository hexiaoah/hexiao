const env = __ENV__; // eslint-disable-line

const urlPrefix = {
    LOCAL: "http://merchant-api.2dfire-daily.com/merchant-api/", // 项目环境http://merchant-api.2dfire-daily.com/
    DEV: "http://merchant-api.2dfire-daily.com/merchant-api/", // 项目环境http://merchant-api.2dfire-daily.com/
    DAILY: "http://merchant-api.2dfire-daily.com/",
    PRE: "http://merchant-api.2dfire-pre.com/",
    PUBLISH: "https://merchant-api.2dfire.com/",
};
const urlNetwork = {
    LOCAL: 'http://gateway.2dfire-daily.com', // 项目环境
    DEV: 'http://gateway.2dfire-daily.com', // 项目环境
    DAILY: 'http://gateway.2dfire-daily.com',
    PRE: 'http://gateway.2dfire-pre.com',
    PUBLISH: 'https://gateway.2dfire.com'
}

// 商品图片域名
const imgUrl = {
    LOCAL: "https://ifiletest.2dfire.com/",
    DEV: "https://ifiletest.2dfire.com/",
    DAILY: "https://ifiletest.2dfire.com/",
    PRE: "https://ifile.2dfire.com/",
    PUBLISH: "https://ifile.2dfire.com/",
}
// 商品图片上传projectName
const imgProjectName = {
    LOCAL: "OssTest",
    DEV: "OssTest",
    DAILY: "OssTest",
    PRE: "OssDfire",
    PUBLISH: "OssDfire",
}

// webCocket
const webCocketUrl = {
    LOCAL: "http://10.1.6.218:9003/notify?scanId=html-socket",
    DEV: "http://10.1.6.218:9003/notify?scanId=html-socket",
    DAILY: "http://10.1.6.218:9003/notify?scanId=html-socket",
    PRE: "https://websocket.2dfire-pre.com/notify?scanId=html-socket",
    PUBLISH: "https://websocket.2dfire.com/notify?scanId=html-socket",
}

const upload = {
    LOCAL: "https://upload.2dfire-daily.com",
    DEV: "https://upload.2dfire-daily.com",
    DAILY: "https://upload.2dfire-daily.com",
    PRE: "https://upload.2dfire-pre.com",
    PUBLISH: "https://upload.2dfire.com",
}

const urlUploadRul = {
  LOCAL: "https://upload.2dfire-daily.com", // 项目环境
  DEV: "https://upload.2dfire-daily.com", // 项目环境
  DAILY: "https://upload.2dfire-daily.com",
  PRE: "https://upload.2dfire-pre.com",
  PUBLISH: "https://upload.2dfire.com"
};
const FHYurl = {
    LOCAL: "http://tt.2dfire.net/presellAdmin_league_shop_manager/page/index.html#",    //项目环境
    DEV: "../presell-admin/page/index.html#",
    DAILY: "../presell-admin/page/index.html#",
    PRE: "http://biz.2dfire-pre.com/presell-admin/page/index.html#",                            //预发环境
    PUBLISH: "https://biz.2dfire.com/presell-admin/page/index.html#"                             //正式环境
}

const weixinMealProjectName = 'visual_config'
const urlWeixinMeal = {
    LOCAL: `http://api.l.whereask.com/${weixinMealProjectName}/api`,
    DEV: `http://api.l.whereask.com/${weixinMealProjectName}/api`,
    DAILY: 'http://api.l.whereask.com/daily/api',
    PRE: 'https://meal.2dfire-pre.com',
    PUBLISH: 'https://meal.2dfire.com',
}

// 获取当前运行时环境变量
export const currentEnvString = env || "DEV"; // eslint-disable-line

// 运行时 API 前缀
export const currentAPIUrlPrefix = urlPrefix[currentEnvString];
export const currentAPIUrlNetwork = urlNetwork[currentEnvString];
export const currentUrlUploadRul = urlUploadRul[currentEnvString];
export const currentIMGProject = imgProjectName[currentEnvString]
export const currentIMGUrl = imgUrl[currentEnvString]
export const currentExLink = FHYurl[currentEnvString]
export const currentWeixinMealUrl = urlWeixinMeal[currentEnvString]
export const currentwebCocketUrl = webCocketUrl[currentEnvString]
//针对于获取侧边栏信息的接口
export const UPLOAD_BASE_URL = upload[currentEnvString]
//针对于获取侧边栏信息的接口
export const merApiPrefix = {
    LOCAL: "http://merchant-api.2dfire-daily.com/",
    DEV: "http://merchant-api.2dfire-daily.com/",
    DAILY: "http://merchant-api.2dfire-daily.com/", //  http://merchant-api.2dfire-daily.com/
    PRE: "http://merchant-api.2dfire-pre.com/",
    PUBLISH: "https://merchant-api.2dfire.com/"
} [currentEnvString];

