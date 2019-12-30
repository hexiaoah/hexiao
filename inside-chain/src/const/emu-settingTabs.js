const tab = [
    {
        name: "商品管理",
        path: "/goods_manage"
    }, {
        name: "套餐管理",
        path: "/combo_manage"
    }, {
        name: "分类管理",
        path: "/goods_class"
    }, {
        name: "商品属性",
        path: "/goods_attr"
    }, {
        name: "菜单管理",
        path: "/menu_manage",
        child: [
            '/menu_goods',
            '/menu_import'
        ]
    }
]
export default tab;
