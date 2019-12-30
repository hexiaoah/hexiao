//门店桌位/区域路由
import shopTableManage from '../../views/shop/table-manage'
import shopTableManageList from '../../views/shop/table-manage/table'
import shopTableManageAdd from '../../views/shop/table-manage/table/add'
import shopTableManageEdit from '../../views/shop/table-manage/table/edit'
import shopTableManageImport from '../../views/shop/table-manage/table/import'
import shopAreaManageList from '../../views/shop/table-manage/area'

export default [
    {
        path: '/shop_table_manage',
        name: 'shopTable',
        title: '门店桌位设置',
        component: shopTableManage,
        redirect: '/shop_table_manage/list',
        children: [
            {
                path: 'list',
                name: 'shopTableList',
                title: '门店桌位列表',
                component: shopTableManageList,
            },
        ],

    },
    {
        path: '/shop_table_manage/add',
        name: 'shopTableAdd',
        title: '门店桌位新增',
        component: shopTableManageAdd,
    },
    {
        path: '/shop_table_manage/edit',
        name: 'shopTableEdit',
        title: '门店桌位编辑',
        component: shopTableManageEdit,
    },
    {
        path: '/shop_table_manage/import',
        name: 'shopTableImport',
        title: '门店桌位导入',
        component: shopTableManageImport,
    },
    {
        path: '/shop_area_manage',
        name: 'shopArea',
        title: '门店区域设置',
        component: shopTableManage,

        redirect: '/shop_area_manage/list',
        children: [
            {
                path: 'list',
                name: 'shopAreaList',
                title: '门店区域列表',
                component: shopAreaManageList,
            }
        ]
    },
]
