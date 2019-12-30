/**
 * 数据定义 formatter
 * 2019/05/02 @fengtang
 */

export function formatSenceDefinition(raw) {
    const definition = {
        name: null,
        pages: [],
        customPage: null,
        ...raw,
    }

    if (definition.pages.length) {
        definition.pages = definition.pages.map(formatPageDefinition)
    }
    if (definition.customPage) {
        definition.customPage = formatCustomPageCommonDefinition(definition.customPage)
    }

    return definition
}


function formatPageDefinition(raw) {
    return {
        name: null,
        configName: null,
        link: null,
        manageable: true,
        components: [],
        defaults: {},
        ...raw,
    }
}


function formatCustomPageCommonDefinition(raw) {
    return {
        components: [],
        defaults: {},
        ...raw,
    }
}


export function formatDesignComponent(com) {
    return {
        definition: formatComponentDefinition(com.definition),
        component: com.component,
    }
}


function formatComponentDefinition(raw) {
    const defaultGroup = '其他类'

    const definition = {
        name: null,
        userName: null,
        description: null,
        choosable: true,
        max: null,
        group: defaultGroup,
        position: null,
        bare: false,
        config: {},
        ...raw,
    }

    // 修正无效值
    if (!definition.description) {
        definition.description = definition.userName
    }
    if (definition.choosable) {
        definition.bare = false
    }
    if (!definition.choosable) {
        definition.max = null
        definition.group = defaultGroup
    }
    if (definition.bare && !definition.position) {
        definition.position = 'top'
    }
    if (definition.choosable && definition.position) {
        definition.max = 1
    }

    return definition
}
