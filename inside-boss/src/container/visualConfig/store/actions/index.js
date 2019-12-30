import store from '@src/store'
import visualApi from '@src/api/visualConfigApi'
import types from '../actionTypes'
import { getShopInfo } from './common'
import { initDesign } from './design'


export * from './design'


export function loadBaseInfo() {
    store.dispatch({ type: types.SHOP_INFO_RESET })
    visualApi.getShopInfo().then(
        data => {
            store.dispatch({ type: types.SHOP_INFO_LOADED, data })

            const { canConfig } = getShopInfo()
            if (canConfig) {
                loadCustomPages(true)
            } else {
                store.dispatch({ type: types.CUSTOM_PAGES_NOT_LOAD })
            }
        },
        () => store.dispatch({ type: types.SHOP_INFO_LOAD_FAILED }),
    )
}


// ==================================


export function loadCustomPages(reset = false) {
    const { appId, appVersionId } = getShopInfo()

    if (reset) store.dispatch({ type: types.CUSTOM_PAGES_RESET })

    visualApi.getCustomPages({ appId, appVersionId }).then(
        data => store.dispatch({ type: types.CUSTOM_PAGES_LOADED, data }),
        () => store.dispatch({ type: types.CUSTOM_PAGES_LOAD_FAILED }),
    )
}


export function addCustomPage(data) {
    const { appId, appVersionId } = getShopInfo()
    const { pageName, shareImage, shareText } = data

    return visualApi.addCustomPage({ appId, appVersionId, pageName, shareImage, shareText })
        .then(
            res => {
                if (res && res.data) {
                    return { result: true }
                } else {
                    return { result: false, message: '创建失败' }
                }
            },
            e => ({ result: false, message: e.message }),
        )
}


export function updateCustomPage(pageCode, updates) {
    const { appId, appVersionId } = getShopInfo()
    const { pageName, shareImage, shareText } = updates

    return visualApi.updateCustomPage({ appId, appVersionId, pageCode, pageName, shareImage, shareText })
        .then(
            res => {
                if (res && res.data) {
                    return { result: true }
                } else {
                    return { result: false, message: '更新失败' }
                }
            },
            e => ({ result: false, message: e.message }),
        )
}


export function removeCustomPage(pageCode) {
    return visualApi.removeCustomPage({ pageCode })
        .then(
            res => {
                if (res && res.data) {
                    return { result: true }
                } else {
                    return { result: false, message: '更新失败' }
                }
            },
            e => ({ result: false, message: e.message }),
        )
}


// ==================================


export function loadBackups() {
    const { appId, appVersionId } = getShopInfo()

    store.dispatch({ type: types.BACKUPS_RESET })

    visualApi.getBackups({ appId, appVersionId }).then(
        data => store.dispatch({ type: types.BACKUPS_LOADED, data }),
        () => store.dispatch({ type: types.BACKUPS_LOAD_FAILED })
    )
}

// 返回值：Promise => true 还原成功；false 还原失败
export function recoverBackup(item) {
    return visualApi.getConfigContent({ configId: item.configId })
        .then(
            res => {
                if (res && res.data && res.data.content) {
                    initDesign(item.name, res.data.content)
                    return true
                }
                return false
            },
            () => false,
        )
}

// 返回值：Promise => true 删除成功；false 删除失败
export function removeBackup(item) {
    return visualApi.removeBackup({ configId: item.configId })
        .then(
            res => {
                loadBackups()
                return res && res.data
            },
            () => {
                loadBackups()
                return false
            }
        )
}


// ==================================


export function loadTemplates() {
    store.dispatch({ type: types.TEMPLATES_RESET })
    return visualApi.getTemplates().then(
        data => store.dispatch({ type: types.TEMPLATES_LOADED, data }),
        () => store.dispatch({ type: types.TEMPLATES_LOAD_FAILED }),
    )
}


// 返回值：Promise => true 还原成功；false 还原失败
export function useTemplate(item) {
    return visualApi.getConfigContent({
        preConfigAppId: item.appId,
        preConfigAppVersionId: item.appVersionId,
    }).then(
        res => {
            if (res && res.data && res.data.content) {
                // 目前只有首页内容有模板
                initDesign('page:home', res.data.content)
                return true
            }
            return false
        },
        () => false,
    )
}
