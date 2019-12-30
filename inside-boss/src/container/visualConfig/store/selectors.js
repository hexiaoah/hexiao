/*
类似 Vuex 里的 getter
一组纯函数的计算方法，返回二次处理过的 state / definition 内容

组件使用 selector 时，应将其放到 redux connect() 里，让其内容通过 props 传递进来，
以保证数据更新时组件能够重新渲染。（不需要读取 state 的 selector 除外）
详见 <https://github.com/reduxjs/reselect>


例子：
function someSelector(state) {
    return state.visualConfig.xxx
}

@connect(state => ({
    someValue: someSelector(state)
}))
class SomeComponent extends Component {
    render() {
        return <div>{{this.props.someValue}}</div>
    }
}
*/

import { createSelector } from 'reselect'
import { first, arr2obj, isObject, oneOf, count } from '@src/container/visualConfig/utils'
import sences from '@src/container/visualConfig/sences'
import cookie from '@2dfire/utils/cookie'


/**
 * 返回基本信息的加载状态
 * null: 加载中/待加载, true: 加载成功，false: 加载失败
 */
export const getBaseInfoStatus = createSelector(
    [
        state => state.visualConfig.shopInfo.loadingStatus,
        state => state.visualConfig.customPages.loadingStatus,
    ],
    (shopInfoStatus, customPagesStatus) => {
        if (shopInfoStatus && customPagesStatus) return true
        if (shopInfoStatus === false || customPagesStatus === false) return false
        return null
    },
)


/**
 * 返回当前 sence 的定义
 */
export function getCurrentSence(state) {
    // 目前就一种 sence，直接返回
    const data = JSON.parse(cookie.getItem('entrance')).shopInfo
    const { entityTypeId, isInLeague } = data // entityTypeId: 3是店铺，10是联盟；isInLeague：1，店铺是属于联盟下的店铺
    if (entityTypeId == '10' || (entityTypeId == '3' && !!isInLeague)){ // 联盟或者是联盟下的店铺
        return sences[1]
    }
    return sences[0]
}


/**
 * 返回当前场景下各页面（包括各自定义页面）的数据（在页面定义基础上补充信息）
 * 数组的第一项为默认要装修的页面
 */
export const getPages = createSelector(
    [
        getCurrentSence,
        state => state.visualConfig.customPages.list,
    ],
    (sence, customPages) => {
        if (!sence || !customPages) return []
        return [
            ...sence.pages.map(makeSysemPageData),
            ...customPages.map(pageData => makeCustomPageDate(sence, pageData)),
        ]
    },
)
function makeSysemPageData(page) {
    return {
        // page definition
        ...page,

        // extra data
        isSystem: true,
        createTime: null,
        viewCount: null,
    }
}
function makeCustomPageDate(sence, pageData) {
    return {
        // custom page definition
        name: pageData.name,
        configName: `page:custom:${pageData.code}`,
        link: () => pageData.url,
        manageable: true,
        ...sence.customPage,

        // extra data
        isSystem: false,
        pageCode: pageData.code,
        createTime: pageData.createTime,
        viewCount: pageData.viewCount,
        shareText: pageData.shareText,
        shareImage: pageData.shareImage,
    }
}


/**
 * 按顺序返回当前装修页面下各 design component 的 name pair
 * return [ [origName, aliasName], ... ]
 */
const getPageDesignComponentNamePairs = createSelector(
    [
        getPages,
        state => state.visualConfig.design.configName,
    ],
    (pages, currentConfigName) => {
        const page = first(pages, p => p.configName === currentConfigName)
        if (!page) return []
        return page.components.map(item => (
            isObject(item) ? [Object.keys(item)[0], Object.values(item)[0]] : [item, item]
        ))
    },
)


/**
 * 按顺序返回当前装修页面下各 design component 的 alias name
 */
export const getPageDesignComponentNames = createSelector(
    [getPageDesignComponentNamePairs],
    namePairs => namePairs.map(i => i[1]),
)


/**
 * 返回当前装修页面下的 design components
 * { aliasName: designComponent }
 */
export const getPageDesignComponentMap = createSelector(
    [getPageDesignComponentNamePairs],
    namePairs => arr2obj(
        namePairs,
        ([comName, aliasComName]) => {
            // 避免循环依赖，在函数内容引入 components 列表
            const designComponents = require('@src/container/visualConfig/designComponents').default // eslint-disable-line
            return [aliasComName, first(designComponents, c => c.definition.name === comName)]
        },
    ),
)


/**
 * 返回分组后的 design components 名称列表
 *
 * 返回值：
 * groups = [
 *     {
 *         name: 'groupName',
 *         list: [
 *             componentName,   // 此为 aliasName
 *             ...
 *         ]
 *     },
 *     ...
 * ]
 */
export const getPageDesignComponentGroups = createSelector(
    [
        getPageDesignComponentNames,
        getPageDesignComponentMap,
    ],
    (comNames, pageDesignComponentMap) => {
        const groups = [
            // { name: '', list: [ name, ... ] },
            // ...
        ]

        comNames.forEach(name => {
            const def = pageDesignComponentMap[name].definition

            if (!def.choosable) return  // 只把 choosable 的组件纳入分组

            const groupName = def.group
            let group = first(groups, g => g.name === groupName)
            if (!group) {
                group = { name: groupName, list: [] }
                groups.push(group)
            }

            group.list.push(name)
        })

        return groups
    },
)


/**
 * 返回指定组件被使用了几次
 * getComponentCount(state, comName) => number
 */
export const getDesignComponentCount = createSelector(
    [
        state => state.visualConfig.design.componentConfigs,
        (state, comName) => comName,
    ],
    (componentConfigs, comName) => componentConfigs.filter(c => c.name === comName).length,
)


/**
 * 返回正在装修的页面的定义
 */
export const getCurrentPage = createSelector(
    [
        getPages,
        state => state.visualConfig.design.configName,
    ],
    (pages, currentConfigName) => first(pages, p => p.configName === currentConfigName),
)


/**
 * 判断指定 id 的组件是否处于编辑状态
 */
export const getComponentEditing = createSelector(
    [
        (state, id) => id,
        state => state.visualConfig.design.editingId,
    ],
    (id, editingId) => id === editingId,
)


/**
 * 计算出可以插入组件的 index 区间（仅限 position=null 的组件，其他组件都是自动确定位置的）
 * 最后一个 position=top 的组件之后 ~ 第一个 position=bottom/fixed 的组件之前，是插入 position=null 的组件的有效位置
 */
export const getInsertableRange = createSelector(
    [
        getPageDesignComponentMap,
        state => state.visualConfig.design.componentConfigs,
    ],
    (comMap, configs) => {
        // 判断指定 index 的组件是否是自然排序的
        const getPosition = item => comMap[item.name].definition.position

        const startIndex = count(configs, item => getPosition(item) === 'top')
        const endIndex = configs.length - count(configs, item => oneOf(getPosition(item), 'bottom', 'fixed'))
        return [startIndex, endIndex]
    },
)


/**
 * 计算出把组件移动到的 index 区间（仅限 position=null 的组件，其他组件都是自动确定位置的）
 */
export const getMoveableRange = createSelector(
    [getInsertableRange],
    insertableRange => [insertableRange[0], insertableRange[1] - 1],
)
