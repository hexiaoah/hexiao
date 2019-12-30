/**
 * 装修数据相关 formatter
 * 2019/05/02 @fengtang
 */
import store from '@src/store'
import { randstr, format, first, omit, isObject } from '../../utils'
import { getPageDesignComponentNames, getPageDesignComponentMap } from '../selectors'


// 各 position 值的先后顺序
const positionOrder = {
    top: 1,
    nature: 2,
    bottom: 3,
    fixed: 4,
}


function getState() {
    return store.getState()
}


/**
 * 返回组件在页面定义里出现的序号
 */
function getComponentIndex(comName) {
    return getPageDesignComponentNames(getState()).indexOf(comName)
}


export function makeComponentConfigItem(name, config = null) {
    const def = getPageDesignComponentMap(getState())[name].definition
    const id = (isObject(config) && config.id) || `${name}-${new Date().getTime()}-${randstr(5)}`
    config = format(def.config, isObject(config) ? omit(config, 'id') : config)
    return { id, name, config }
}


// 把 appConfig 整理成 componentConfigs
export function transformConfigData(configData) {
    const state = getState()
    const { configName } = state.visualConfig.design
    const comNames = getPageDesignComponentNames(state)
    const comMap = getPageDesignComponentMap(state)

    let configs = []
    // 把 bare=true 的组件整理到 configs 数组中
    Object.keys(configData).forEach(key => {
        if (key === 'components') return
        // 排除不支持的组件（有的组件之前保存 config 时还支持，但现在已不支持）
        if (getComponentIndex(key) === -1) {
            console.warn(`不支持的组件：${configName} ${key}`)
            return
        }
        configs.push(makeComponentConfigItem(key, configData[key]))
    });
    // 把 bare=false 的组件整理到 configs 数组中
    (configData.components || []).forEach(config => {
        config = { ...config }
        const comName = config.type
        delete config.type
        // 排除不支持的组件（有的组件之前保存 config 时还支持，但现在已不支持）
        if (getComponentIndex(comName) === -1) {
            console.warn(`不支持的组件：${configName} ${comName}`)
            return
        }
        configs.push(makeComponentConfigItem(comName, config))
    })
    // 把 choosable=false 但没出现在 configs 里的组件强制加入到 configs 中
    comNames.forEach(comName => {
        const comDef = comMap[comName].definition
        if (comDef.choosable) return
        if (first(configs, item => item.name === comName)) return
        configs.push(makeComponentConfigItem(comName))
    })

    // 对组件进行排序
    configs = sortComponentConfigs(configs)

    return configs
}


export function sortComponentConfigs(configs) {
    const comMap = getPageDesignComponentMap(getState())

    configs = [...configs]
    configs.sort((a, b) => {
        const nameA = a.name
        const nameB = b.name
        const posA = comMap[nameA].definition.position
        const posB = comMap[nameB].definition.position

        // 若两个组件都未设置 position，保持原排序
        if (!posA && !posB) return 0

        // position 值相同的两个组件，按照在页面定义里的出现顺序排序
        if (posA === posB) {
            return getComponentIndex(nameA) - getComponentIndex(nameB)
        }

        // position 不同的两个组件，根据 position 确定顺序
        return positionOrder[posA || 'nature'] - positionOrder[posB || 'nature']
    })
    return configs
}


// 把 componentConfigs 格式化成 appConfig
export function makeConfigData(componentConfigs) {
    const comMap = getPageDesignComponentMap(getState())

    const appConfig = {}
    const components = []

    componentConfigs.forEach(item => {
        const def = comMap[item.name].definition
        if (def.bare) {
            appConfig[item.name] = item.config
        } else {
            components.push({
                ...item.config,
                id: item.id,
                type: item.name,
            })
        }
    })

    if (components.length) appConfig.components = components
    return appConfig
}


export function formatPreviewUrl(url) {
    // 后端对同一 config 返回的预览 url 始终是一样的
    // 在 url 后加时间戳以避免缓存，并使预览二维码产生变化以让用户感觉到预览内容变化了
    const search = `t=${new Date().getTime()}`
    return url.indexOf('?') > -1
        ? url + '&' + search
        : url + '?' + search
}
