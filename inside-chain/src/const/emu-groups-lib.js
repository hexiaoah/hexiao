const Tab = [
    {
        name: "分组管理",
        path: "/group",
        title:'',
        children: [
            '/single_shop_goods_add',
            '/single_shop_goods_edit',
        ]
    },
    {
        name: "类别管理",
        path: "/category",
        title:'可创建类别便于分组进行分类：例如可创建类别【门店位置】，用于归类机场店分组、火车站店分组、景区店分组等',
        children: [
            '/single_shop_suit_add_first_step',
            '/single_suit_add_second_step',
            '/single_suit_edit_first_step',
            '/single_suit_edit_second_step'
        ]
    },

]

export default Tab
