export default {
    name: 'goodsList',
    userName: '商品',
    group: '基础类',
    max: 5,
    config: {
        mode: '大图',
        goodsList: [],
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
