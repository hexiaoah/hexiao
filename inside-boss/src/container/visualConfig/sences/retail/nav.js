const page = {
    name: '店铺导航',
    configName: 'theme',
    manageable: false,

    components: [
        'nav',
    ],

    defaults: null,
}


const defaults = {
    nav: {
        mode: '经典展开式',
        expandItems: [
            {
                icon: 'https://assets.2dfire.com/frontend/cda13b8de7b22dc6b4fd2a5107060a57.png',
                linkPage: '店铺主页',
            },
            {
                icon: 'https://assets.2dfire.com/frontend/a6c61d108d7c947049900ba9bbded299.png',
                linkPage: '购物车',
            },
            {
                icon: 'https://assets.2dfire.com/frontend/2a18a14f3ce33ff0ee09cca3136bd8be.png',
                linkPage: '商品分类',
            },
            {
                icon: 'https://assets.2dfire.com/frontend/7635848288a41b91dbbedc39cab4a68e.png',
                linkPage: '本店优惠',
            },
            {
                icon: 'https://assets.2dfire.com/frontend/c331eba97b79bd4f919ad747df84e9e5.png',
                linkPage: '我的',
            },
        ],
    }
}


export default {
    ...page,
    defaults,
}
