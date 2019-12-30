const tab = [
    {
        name: "经营概况",
        path: "/shop_manage_view"
    }, {
        name: "店铺资料",
        path: "/shop_manage_info"
    }, {
        name: "商品库",
        path: "/shop_manage_library_goods_manage",
        child: [
            '/shop_manage_library_suit_manage',
            '/single_shop_goods_add',
            '/single_shop_goods_edit',
            '/single_shop_suit_add_first_step',
            '/single_suit_add_second_step',
            '/single_suit_edit_first_step',
            '/single_suit_edit_second_step',
            '/single_shop_goods_attr',
            '/single_shop_goods_class',
        ]
    },
    // {
    //     name: "店铺员工",
    //     path: ""
    // }, {
    //     name: "桌位设置",
    //     path: ""
    // },
    // {
    //     name: "电子收款账户",
    //     path: ""
    // },
    // {
    //     name: "本店二维码",
    //     path: ""
    // },
	{
	    name: '传菜',
	    path: '/store_pass'
	},
    // {
    //     name: "收银设置",
    //     path: "/shop_pay_kind_manage",
    //     child: [
    //         '/shop_pay_kind_add',
    //         '/shop_pay_kind_edit'
    //     ]
    // }
]
export default tab
