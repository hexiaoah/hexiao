export default {
    name: 'pictureTextNav',
    userName: '图文导航',
    group: '基础类',
    max: 5,
    config: {
        mode: '图片导航',
        textColor: '#000000',
        items: [
            // ===== format =====
            {
                picture: '',
                text: '',

                linkType: 'goods',
                linkGoodsId: '',
                linkPage: '',
            },

            // ===== defaults =====
            {
                picture: '',
                text: '导航一',
                linkType: 'goods',
                linkGoodsId: '',
                linkPage: '',
            },
            {
                picture: '',
                text: '导航二',
                linkType: 'goods',
                linkGoodsId: '',
                linkPage: '',
            },
            {
                picture: '',
                text: '导航三',
                linkType: 'goods',
                linkGoodsId: '',
                linkPage: '',
            },
        ],
    },
}
