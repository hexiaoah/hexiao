import store from '@src/store'
import { indexOf, first } from '@src/container/visualConfig/utils'
import types from '../actionTypes'
import { formatPreviewUrl, transformConfigData, sortComponentConfigs, makeComponentConfigItem } from '../formatters/design'
import { getPageDesignComponentMap, getInsertableRange, getMoveableRange } from '../selectors'


/*
componentConfigs 格式

[
    { id, name, config },
    ...
]

- 组件在数组里的顺序就是渲染顺序
- id        随机生成的唯一标识。因为不能用 index 作为组件的 key，只好手动生成一个唯一 key
- name      组件名，生成 appConfig 时会包含在组件 config 里
- config    就是是组件的 config
*/

export const initialState = {
    // 装修中的 config name
    configName: null,

    // 装修中的组件数据
    // 加载中：null  加载失败：false  加载成功：[]
    componentConfigs: null,

    // 编辑中的组件
    editingId: null,

    // data 加载失败时的提示信息
    loadingFailedMessage: null,

    // config 是否更新过且未发布
    updated: false,

    // 预览 URL
    previewUrl: null,
}



export default function designReducer(state, action) {
    if (!state) return initialState

    switch (action.type) {
        case types.DESIGN_CONFIG_LOADING:
            return { ...initialState, configName: action.name }

        case types.DESIGN_CONFIG_LOADED:
            return {
                ...state,
                componentConfigs: transformConfigData(action.data),
            }

        case types.DESIGN_CONFIG_LOAD_FAILED:
            return {
                ...state,
                componentConfigs: false,
                loadingFailedMessage: action.message,
            }

        case types.DESIGN_CONFIG_SAVED:
            return {
                ...state,
                updated: false,
            }

        case types.DESIGN_PREVIEW:
            return {
                ...state,
                previewUrl: formatPreviewUrl(action.url),
            }

        case types.DESIGN_LEAVE_PREVIEW:
            return {
                ...state,
                previewUrl: null,
            }

        case types.DESIGN_RESET:
            return initialState

        default:
            return editReducer(state, action)
    }
}


// 装修编辑相关
function editReducer(state, action) {
    const fullState = store.getState()
    const comMap = getPageDesignComponentMap(fullState)

    function insertable(index) {
        const [startIndex, endIndex] = getInsertableRange(fullState)
        return index >= startIndex && index <= endIndex
    }

    function moveable(toIndex) {
        const [startIndex, endIndex] = getMoveableRange(fullState)
        return toIndex >= startIndex && toIndex <= endIndex
    }

    // 报错并原样返回 state
    function error(message) {
        console.error(`${action.type}: ${message}`)
        return state
    }

    switch (action.type) {
        case types.COMPONENT_ADD: {
            const { name, index = null } = action
            const def = comMap[name].definition
            if (!def.choosable) return error(`component ${name} not choosable`)

            const configItem = makeComponentConfigItem(name)
            let componentConfigs = [...state.componentConfigs]
            if (def.position !== null || index === null) {
                // 对于“指定了 position 的组件”和“没指定 position 但也没指定放置位置的组件”，放到列表最后面，再交给 sort 函数来调整排序
                componentConfigs.push(configItem)
                componentConfigs = sortComponentConfigs(componentConfigs)
            } else {
                if (!insertable(index)) return error(`invalid index ${index}`)
                componentConfigs.splice(index, 0, configItem)
            }

            return {
                ...state,
                componentConfigs,
                editingId: configItem.id,      // 让新添加的组件处于编辑状态
                updated: true,
            }
        }

        case types.COMPONENT_REMOVE: {
            const { id } = action
            let { componentConfigs, editingId } = state

            const configItem = first(componentConfigs, item => item.id === id)
            if (!configItem) return error(`component of id ${id} not exists`)
            if (!comMap[configItem.name].definition.choosable) return error(`component ${configItem.name} not choosable`)
            componentConfigs = componentConfigs.filter(item => item.id !== id)

            // 修正“编辑中的组件”
            if (editingId === id) editingId = null

            return {
                ...state,
                componentConfigs,
                editingId,
                updated: true,
            }
        }

        case types.COMPONENT_MOVE: {
            let { id, toIndex } = action
            const componentConfigs = [...state.componentConfigs]

            const currIndex = indexOf(componentConfigs, item => item.id === id)
            if (currIndex === -1) return error(`component of id ${id} not exists`)
            if (!moveable(toIndex)) return error(`invalid move targe index ${toIndex}`)

            const configItem = componentConfigs[currIndex]
            const def = comMap[configItem.name].definition
            if (def.position !== null) return error(`component of id ${id} cannot move`)

            // 先把组件从原位置移除
            componentConfigs.splice(currIndex, 1)
            componentConfigs.splice(toIndex, 0, configItem)

            return {
                ...state,
                componentConfigs,
                updated: true,
            }
        }

        case types.COMPONENT_UPDATED: {
            const { id, config } = action
            const componentConfigs = [...state.componentConfigs]

            const index = indexOf(componentConfigs, item => item.id === id)
            if (index === -1) return error(`component of id ${id} not exists`)

            const configItem = componentConfigs[index]
            componentConfigs[index] = { ...configItem, config }

            return {
                ...state,
                componentConfigs,
                updated: true,
            }
        }

        case types.COMPONENT_EDITING: {
            const { id } = action
            if (!first(state.componentConfigs, item => item.id === id)) return error(`component of id ${id} not exists`)
            return { ...state, editingId: id }
        }

        case types.COMPONENT_LEAVE:
            return { ...state, editingId: null }

        default:
            return state
    }
}
