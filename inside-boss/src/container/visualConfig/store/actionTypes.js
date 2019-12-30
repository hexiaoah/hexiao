import { mirror } from '@src/container/visualConfig/utils'


const prefix = 'VISUAL_CONFIG/'

/*
最终格式：
{
    SHOP_INFO_LOADED: 'VISUAL_CONFIG/SHOP_INFO_LOADED',
    ...
}
*/
export default mirror(prefix, [

    // ===== SHOP INFO =====

    'SHOP_INFO_LOADED',             // { data: shopInfoResp }
    'SHOP_INFO_LOAD_FAILED',
    'SHOP_INFO_RESET',


    // ===== CUSTOM PAGES =====

    'CUSTOM_PAGES_LOADED',          // { data: customPagesResp }
    'CUSTOM_PAGES_LOAD_FAILED',
    'CUSTOM_PAGES_NOT_LOAD',        // 判断不需要加载 custom pages（如当前店铺不支持装修）时触发此 action
    'CUSTOM_PAGES_RESET',


    // ===== BACKUPS =====

    'BACKUPS_LOADED',             // { data: backupsResp }
    'BACKUPS_LOAD_FAILED',
    'BACKUPS_RESET',


    // ===== TEMPLATES =====

    'TEMPLATES_LOADED',             // { data: templatesResp }
    'TEMPLATES_LOAD_FAILED',
    'TEMPLATES_RESET',


    // ===== DESIGN CONFIG ACTION =====

    // 切换要设计的 config，切换后当前 data 等数据会被重置，需要重新执行加载
    // { name: configName }
    'DESIGN_CONFIG_LOADING',

    // config data 加载完成
    // { data: configDataObject }
    'DESIGN_CONFIG_LOADED',

    // config data 加载失败
    // { message: string }
    'DESIGN_CONFIG_LOAD_FAILED',

    // 将 config data 标记为已保存过（即离开时不再提示是否要保存）
    'DESIGN_SAVED',

    // 显示预览信息
    // { url }
    'DESIGN_PREVIEW',

    // 隐藏预览信息
    'DESIGN_LEAVE_PREVIEW',

    // 重置 design 状态
    'DESIGN_RESET',


    // ===== DESIGN COMPONENT ACTION =====

    // 装修：在指定位置添加组件
    // { name: componentName, index: number | null }
    // index 为组件放置位置，为 null 则放到最下面。对设置了 position 的组件无效。
    'COMPONENT_ADD',

    // 装修：移除指定位置的组件
    // { id }
    'COMPONENT_REMOVE',

    // 装修：移动组件
    // { id, toIndex }
    'COMPONENT_MOVE',

    // 装修：更新指定组件的 config
    // { id, config }
    'COMPONENT_UPDATED',

    // 装修：编辑指定的组件
    // { id }
    'COMPONENT_EDITING',

    // 装修：取消编辑当前组件
    'COMPONENT_LEAVE',
])
