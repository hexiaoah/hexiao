import store from '@src/store'
import visualApi from '@src/api/visualConfigApi'
import { isString, first, isObjectAndEmpty } from '@src/container/visualConfig/utils'
import types from '../actionTypes'
import { getPages } from '../selectors'
import { makeConfigData } from '../formatters/design'
import { getShopInfo } from './common'
import validate from '../tmpValidators'


/*
解析 appConfig JSON string
- 成功，返回对象内容
- 内容为空，返回 null
- 解析失败，返回 false
*/
function parseConfigContent(contentString) {
    if (!contentString) return null
    try {
        const content = JSON.parse(contentString)
        // 为 null / undefined、不是对象、对象为空，都视为内容为空
        if (!content || typeof content !== 'object' || !Object.keys(content).length) return null
        return content
    } catch (e) {
        console.log(e)
        return false
    }
}


/*
把当前 configData 转换成 content string
- 成功：{ result: true, name: configName, content: contentString }
- 失败：{ result: false, message: failedMessage }
*/
function stringifyConfig() {
    const { configName, componentConfigs } = store.getState().visualConfig.design
    if (!configName || !componentConfigs) return { result: false, message: '没有配置内容' }

    const configData = makeConfigData(componentConfigs)
    let content
    try {
        content = JSON.stringify(configData)
    } catch (e) {
        console.log(e)
        return { result: false, message: '配置格式化失败' }
    }

    return { result: true, name: configName, content }
}


/*
初始化装修。
在“装修页”之外触发此 action 时，需在数据加载完成后手动路由跳转至 design 页面。

configContent: appConfig JSON 字符串

场景                    =>      提供的参数
-------------------------------------------------------
装修模板 / 装修备份内容    =>     configName、 configContent
装修指定页面              =>     configName
装修默认页面              =>
装修数据加载失败，重新加载  =>
切换页面                 =>      configName
*/
export async function initDesign(configName = null, configContent = null) {
    store.dispatch({ type: types.DESIGN_RESET })

    const state = store.getState()
    const currentConfigName = state.visualConfig.design.configName
    const pages = getPages(state)

    if (!configName) {
        configContent = null        // 未指定 configName 时不允许指定 configContent
        configName = currentConfigName || pages[0].configName
    }

    const page = first(pages, p => p.configName === configName)
    if (!page) store.dispatch({ type: types.DESIGN_CONFIG_LOAD_FAILED, message: '此页面不支持装修' })

    store.dispatch({ type: types.DESIGN_CONFIG_LOADING, name: configName })

    // 拉取 config content
    if (!configContent) {
        const { appId, appVersionId } = getShopInfo()
        try {
            const res = await visualApi.getConfigContent({ appId, appVersionId, name: configName })
            // data 为空对象代表此页面从来没进行过装修，此时应用默认 config
            if (res && res.data && (isString(res.data.content) || isObjectAndEmpty(res.data))) {
                configContent = res.data.content
            } else {
                // 响应数据不合法
                return store.dispatch({ type: types.DESIGN_CONFIG_LOAD_FAILED, message: '配置加载失败' })
            }
        } catch (e) {
            // 请求失败
            return store.dispatch({ type: types.DESIGN_CONFIG_LOAD_FAILED, message: '配置加载失败' })
        }
    }

    let configData
    if (configContent) {
        // 解析 content string
        configData = parseConfigContent(configContent)
        if (configData === false) {
            return store.dispatch({ type: types.DESIGN_CONFIG_LOAD_FAILED, message: '配置内容不合法' })
        } else if (configData === null) {
            // configData 为空则填充默认值
            configData = page.defaults
        }
    } else {
        configData = page.defaults
    }

    return store.dispatch({
        type: types.DESIGN_CONFIG_LOADED,
        name: configName,
        data: configData,
    })
}


// 保存预览数据
// 返回值：Promise => { result: true|false, message: failedMessage }
export async function designPreview() {
    designLeavePreview()

    const stringifyRet = stringifyConfig()
    if (!stringifyRet.result) return stringifyRet

    const { name, content } = stringifyRet
    const { appId, appVersionId } = getShopInfo()

    // TODO: 把验证放到 editor 里
    const errorMsg = validate(JSON.parse(content))
    if (errorMsg) {
        return { result: false, message: errorMsg }
    }

    try {
        const res = await visualApi.preview({ appId, appVersionId, name, content })
        if (!res.data) return { result: false, message: '预览二维码获取失败' }

        store.dispatch({ type: types.DESIGN_PREVIEW, url: res.data })
        return { result: true }
    } catch (e) {
        return { result: false, message: '预览内容保存失败' }
    }
}


export function designLeavePreview() {
    store.dispatch({ type: types.DESIGN_LEAVE_PREVIEW })
}


// 保存备份
// 返回值：Promise => { result: true|false, message: failedMessage, forceable: true|false }
// 传入 force=false 时若备份失败，返回值会带上 forceable 字段，若此字段为 true，说明是因为达到上限而失败，此时可让用户选择是否加上 force=true 并重试一次。
export async function designBackup(force = false) {
    const stringifyRet = stringifyConfig()
    if (!stringifyRet.result) return stringifyRet

    const { name, content } = stringifyRet
    const { appId, appVersionId } = getShopInfo()
    try {
        const res = await visualApi.backup({
            appId,
            appVersionId,
            name,
            content,
            force: force ? 1 : 0,
        })
        return res.data
            ? { result: true }
            : { result: false, message: '备份失败' }
    } catch (e) {
        const forceable = e.message && e.message.indexOf('上限') >= 0
        return { result: false, message: e.message, forceable }
    }
}


// 发布配置
// 返回值：Promise => { result: true|false, message: failedMessage }
export async function designPublish() {
    const stringifyRet = stringifyConfig()
    if (!stringifyRet.result) return stringifyRet

    const { name, content } = stringifyRet
    const { appId, appVersionId } = getShopInfo()

    // TODO: 把验证放到 editor 里
    const errorMsg = validate(JSON.parse(content))
    if (errorMsg) {
        return { result: false, message: errorMsg }
    }

    try {
        const res = await visualApi.publish({ appId, appVersionId, name, content })
        if (!res.data) return { result: false, message: '上架失败' }

        store.dispatch({ type: types.DESIGN_SAVED })
        return { result: true }
    } catch (e) {
        return { result: false, message: '上架失败' }
    }
}


export async function designReset() {
    store.dispatch({ type: types.DESIGN_RESET })
}


export function designAddComponent(name, index) {
    store.dispatch({ type: types.COMPONENT_ADD, name, index })
}

export function designRemoveComponent(id) {
    store.dispatch({ type: types.COMPONENT_REMOVE, id })
}

export function designMoveComponent(id, toIndex) {
    store.dispatch({ type: types.COMPONENT_MOVE, id, toIndex })
}

export function designUpdateComponentConfig(id, config) {
    store.dispatch({ type: types.COMPONENT_UPDATED, id, config })
}

export function designEditComponent(id) {
    store.dispatch({ type: types.COMPONENT_EDITING, id })
}

export function designLeaveComponent() {
    store.dispatch({ type: types.COMPONENT_LEAVE })
}
