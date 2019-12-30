const Tab = [
    {
        name: "商品管理",
        path: "/shop_manage_library_goods_manage",
        children: [
            '/single_shop_goods_add',
            '/single_shop_goods_edit',
        ]
    },
    {
        name: "套餐管理",
        path: "/shop_manage_library_suit_manage",
        children: [
            '/single_shop_suit_add_first_step',
            '/single_suit_add_second_step',
            '/single_suit_edit_first_step',
            '/single_suit_edit_second_step'
        ]
    },
    {
        name: "分类管理",
        path: "/single_shop_goods_class"
    }, {
        name: "商品属性",
        path: "/single_shop_goods_attr"
    },
    // {
    //     name: "菜单",
    //     path: ""
    // }
]

export default Tab
