const env = __ENV__  // eslint-disable-line

const urlPrefix = {


    'LOCAL': 'http://merchant-api.2dfire-daily.com/',
    'DEV': 'http://merchant-api.2dfire-daily.com/',
    'DAILY': 'http://merchant-api.2dfire-daily.com/',
    'PRE': 'http://merchant-api.2dfire-pre.com/',
    'PUBLISH': 'https://merchant-api.2dfire.com/'
}

// 获取当前运行时环境变量
export const currentEnvString = env || 'DEV' // eslint-disable-line

// 运行时 API 前缀
export const currentAPIUrlPrefix = urlPrefix[currentEnvString]
