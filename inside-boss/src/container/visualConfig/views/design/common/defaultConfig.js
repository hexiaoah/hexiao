const pageHome = {
    backgroundImage: null,
    components: [
        {
            type: 'banner',
            mode: '2',
            backgroundImage: null,
        },
        {
            type: 'whitespace',
            height: 25,
        },
        {
            type: 'goodsList',
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
        {
            type: 'goodsList',
            mode: '详细列表',
            goodsList: [],
            showFields: ['名称', '价格', '下单按钮'],
            orderButton: {
                mode: '立即下单',
                orderStyle: '1',
                cartStyle: '1',
            },
            subscript: {
                type: 'text',
                text: '热卖',
                image: null,
            },
        },
        {
            type: 'goodsList',
            mode: '双列小图',
            goodsList: [],
            showFields: ['名称', '价格', '下单按钮'],
            orderButton: {
                mode: '立即下单',
                orderStyle: '1',
                cartStyle: '1',
            },
            subscript: {
                type: 'text',
                text: '热卖',
                image: null,
            },
        },
        {
            type: 'whitespace',
            height: 35,
        },
        {
            type: 'title',
            text: '更多商品',
            size: 'medium',
            textAlign: 'center',
            textColor: '#000000',
            backgroundColor: '#fff',
            linkType: 'page',
            linkGoodsId: '',
            linkPage: '商品分类',
        },
        {
            type: 'whitespace',
            height: 25,
        },
    ],
}

const theme = {
    nav: {
        mode: '经典展开式',                  // 导航样式。可选值："经典展开式", "app式", "微信公众号式"
        backgroundColor: '#000000',     // 背景颜色。仅在 mode="app式" 时有效

        // 经典展开模式的导航项；最少一项，最多10项
        expandItems: [
            {
                icon: 'https://assets.2dfire.com/frontend/8c3d71df65796bcd1f376fa123960fbe.png',
                linkPage: '店铺主页',
            },
            {
                icon: 'https://assets.2dfire.com/frontend/a62f80820be80156ed78632697edfefd.png',
                linkPage: '购物车',
            },
            {
                icon: 'https://assets.2dfire.com/frontend/0c9ca727a8c263b557708dab237d10c6.png',
                linkPage: '商品分类',
            },
            {
                icon: 'https://assets.2dfire.com/frontend/472cf3d8154da74168cd073f9983b08e.png',
                linkPage: '我的',
            },
        ],
        // app 模式的导航项；最少一项，最多4项
        appItems: [
            {
                defaultIcon: null,      // 默认状态下的 icon URL。必填
                highlightIcon: null,    // 高亮状态下的 icon URL。必填
                linkPage: null,         // 链接到哪个页面。必填
            },
            {
              defaultIcon: null,      // 默认状态下的 icon URL。必填
              highlightIcon: null,    // 高亮状态下的 icon URL。必填
              linkPage: null,         // 链接到哪个页面。必填
            },
            {
              defaultIcon: null,      // 默认状态下的 icon URL。必填
              highlightIcon: null,    // 高亮状态下的 icon URL。必填
              linkPage: null,         // 链接到哪个页面。必填
            },
            {
              defaultIcon: null,      // 默认状态下的 icon URL。必填
              highlightIcon: null,    // 高亮状态下的 icon URL。必填
              linkPage: null,         // 链接到哪个页面。必填
            }
        ],
    }
}

const pageCate = {
    backgroundColor: '#eeeeee',
    components: [
        {
            type: 'cateList',
        },
    ],
}

const mine = {
    backgroundColor: '#eeeeee',
    components: [
        {
            type: 'mine',
        },
    ],
}

export default {
    'page:home': JSON.stringify(pageHome),
    'theme': JSON.stringify(theme),
    'page:cate': JSON.stringify(pageCate),
    'page:mine': JSON.stringify(mine),
}
