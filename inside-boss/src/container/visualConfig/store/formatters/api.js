/**
 * 接口返回值 formatter
 * 2019/05/02 @fengtang
 */

export function formatShopInfo(raw) {
    const { appId, appVersionId, canConfig = false } = raw.data || {}
    return {
        appId, appVersionId, canConfig,
    }
}


export function formatCustomPages(raw) {
    return (raw.data || []).map(item => {
        const {
            pageCode,
            pageName,
            pageUrl,
            createTime, viewCount,
            shareImage, shareText,
        } = item

        return {
            code: pageCode,
            name: pageName,
            url: pageUrl,
            createTime,
            viewCount,
            shareImage,
            shareText,
        }
    })
}


export function formatBackups(raw) {
    return (raw.data || []).map(item => {
        const { name, createTime, configId } = item
        return { name, createTime, configId }
    })
}


export function formatTemplates(raw) {
    return (raw.data || []).map(item => {
        const { appId, appVersionId, name, preview } = item
        return {
            appId,
            appVersionId,
            describe: name,
            previewImg: preview,
        }
    })
}
