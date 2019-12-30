export default {
    name: 'goodsRanking',
    userName: '商品排行',
    group: '基础类',
    max: 3,
    config: {
        ranking: '综合排序',
        rankingLimit: 2,

        mode: '大图',

        showFields: ['名称', '价格', '下单按钮'],

        orderButton: {
            mode: '立即下单',
            orderStyle: '1',
            cartStyle: '1',
        },

        subscript: {
            type: 'text',
            text: '新品',
            image: null,
        },
    },
}
