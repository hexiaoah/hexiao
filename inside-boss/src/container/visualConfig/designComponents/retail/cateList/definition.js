export default {
    name: 'cateList',
    userName: '分类商品',
    description: '分类商品(分类商品排序规则由掌柜端设置决定)',
    choosable: false,
    position: 'bottom',
    config: {
        seeLevel: 2,
        showFields: ['商品名称', '商品价格', '下单按钮'],

        orderButton: {
            mode: '加入购物车',
            orderStyle: '1',
            cartStyle: '1',
        },
    },
}
