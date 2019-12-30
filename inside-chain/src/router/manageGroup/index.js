
export default [
    {
        path:"/manage_group",
        name:'manageGroup',
        title:"分组管理",
        redirect:'/group',
        component: resolve => require(["@/views/manage-group"],resolve),
        children:[
            {
                path:"/group",
                name:'group',
                component: resolve => require(["@/views/manage-group/group"],resolve),
            },
            {
                path:"/category",
                name:'category',
                component: resolve => require(["@/views/manage-group/category"],resolve),
            }
        ]
    },{
        path:'/editor_group',
        name:'editorGroup',
        title:'编辑分组',
        component: resolve => require(["@/views/manage-group/editorGroup"],resolve),
    },{
        path:'/add_group',
        name:'addGroup',
        title:'添加分组',
        component: resolve => require(["@/views/manage-group/editorGroup"],resolve),
    },{
        path:'/cashier_monitor',
        name:'cashierMonitor',
        title:'收银台监控',
        component: resolve => require(["@/views/cashierMonitor"],resolve),
    },
    {
        path:'/staff_manage',
        name:'staffManage',
        title:'员工管理',
        redirect:'/role_list',
        component: resolve => require(["@/views/staffManage"],resolve),
        children:[
            // {
            //     path:"/staff_list",
            //     name:'staffList',
            //     component: resolve => require(["@/views/staffManage/staffList"],resolve),
            // },
            {
                path:"/role_list",
                name:'roleList',
                component: resolve => require(["@/views/staffManage/roleList"],resolve),
            },
        ]
    },
    {
        path:'/role_edit',
        name:'roleEdit',
        title:'职级编辑',
        component: resolve => require(["@/views/staffManage/roleEdit"],resolve),
    },
    {
        path:'/apply_shops',
        name:'applyShops',
        title:'适用门店',
        component: resolve => require(["@/views/staffManage/applyShops"],resolve),
    },
    {
        path: '/headquarters_staff',
        name: 'headquartersStaff',
        title: '总部员工',
        redirect: '/chain_staff_list',
        component: resolve => require(["@/views/staffManage/headquartersStaff"],resolve),
        children:[
            {
                path:'/chain_staff_list',
                name:'chainStaffList',
                title:'总部员工列表',
                component: resolve => require(["@/views/staffManage/chainStaffList"],resolve),
            },
            {
                path:'/chain_role_action',
                name:'chainRoleAction',
                title:'职级与权限',
                component: resolve => require(["@/views/staffManage/chainRoleAction"],resolve),
            }
        ]
    },
    {
        path:'/staff_edit',
        name:'staffEdit',
        title:'员工编辑',
        component: resolve => require(["@/views/staffManage/chainStaffList/staffEdit"],resolve),
    },
    {
        path:'/chain_role_edit',
        name:'chainRoleEdit',
        title:'总部职级编辑',
        component: resolve => require(["@/views/staffManage/chainRoleEdit"],resolve),
    },
    {
        path:'/coutom_content',
        name:'coutomContent',
        title:'自定义编码和简称',
        component: resolve => require(["@/views/shop/coutom-content"],resolve),
    }
]